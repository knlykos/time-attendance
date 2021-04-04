// @flow
import "react-calendar-timeline/lib/Timeline.css";
import axios, { AxiosResponse } from "axios";
import type { User } from "./../../models/user";

import React, { Component } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline/lib";

import { itemsData } from "./Objects/data";
type State = {
  groups: any[],
  items: any[],
  defaultTimeEnd: Date,
  defaultTimeStart: Date,
};
type Props = { data: Date };
var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};
export default class ShiftPlanner extends Component<Props, State> {
  constructor(props: { data: Date }) {
    console.log(itemsData);
    super(props);
    this.getEmployees();
    let groups = [{ id: 1, title: "NEFI" }];
    let items = itemsData;
    console.log(items);
    const defaultTimeStart = moment().startOf("day").toDate();
    const defaultTimeEnd = moment().startOf("day").add(1, "day").toDate();

    this.state = {
      groups,
      items,
      defaultTimeEnd,
      defaultTimeStart,
    };
  }
  componentDidMount() {}

  async getEmployees() {
    const employees = await (
      await axios.get<any, AxiosResponse<Array<User>>>(
        "http://192.168.0.72:3001/employees/find-all"
      )
    ).data;
    this.setState({ groups: this.createGroups(employees) });
  }

  createGroups(employees: User[]): any[] {
    return employees.map((v) => {
      return {
        id: v.id,
        title: v.firstName + " " + v.lastName,
      };
    });
  }
  resizeValidator(action: any, item: any, time: any, resizeEdge: any): any {
    // console.log(action);
    // console.log(item);
    // console.log(resizeEdge);
    // console.log(new Date(time));
    // console.log(new Date().getTime());
    console.log(item.end);
    console.log(moment(time).toDate());
    // console.log(moment(item.end).add())
    if (time < new Date().getTime()) {
      // var newTime =
      //   Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000);
      var newTime = moment().startOf("day").add(13, "hours").toDate();
      // console.log(moment(newTime));
      return newTime;
    }

    // if (time > new Date().getTime()) {
    //   var newTime = moment().startOf("day").add(24, "hours").toDate();
    //   return newTime;
    // }

    return time;
  }
  handleItemMove: any = (itemId: any, dragTime: any, newGroupOrder: any) => {
    console.log(this.state);
    const { items, groups } = this.state;

    const group = groups[newGroupOrder];

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id,
            })
          : item
      ),
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize: any = (itemId: any, time: any, edge: any) => {
    const { items } = this.state;

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === "left" ? time : item.start,
              end: edge === "left" ? item.end : time,
            })
          : item
      ),
    });

    console.log("Resized", itemId, time, edge);
  };

  render(): any {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarContent={<div>Above The Left</div>}
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        showCursorLine
        canMove={true}
        canResize={true}
        moveResizeValidator={this.resizeValidator}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    );
  }
}
