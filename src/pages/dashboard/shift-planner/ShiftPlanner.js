// @flow
import "react-calendar-timeline/lib/Timeline.css";
import axios, { AxiosResponse } from "axios";
import type { User } from "./../../models/user";
import { itemsData, availability } from "./Objects/data.js";

import React, { Component } from "react";
import moment from "moment";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline/lib";

type State = {
  groups: any[],
  items: any[],
  defaultTimeEnd: Date,
  defaultTimeStart: Date,
  itemsData: any[],
  availability: any[],
  itemSelected: any,
  itemAvailability: any[],
  weeksAdvance: number,
  weekDay: number,
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
    const firstDayOfWeek = moment().day(1).startOf("isoWeek").week(15);
    const lastDayOfWeek = moment(firstDayOfWeek).add(6, "days");
    const defaultTimeStart = firstDayOfWeek.toDate();
    const defaultTimeEnd = firstDayOfWeek.add(1, "day").toDate();
    // const weekDay = 1;
    console.log(firstDayOfWeek);
    console.log(lastDayOfWeek);
    this.state = {
      groups,
      items,
      defaultTimeEnd,
      defaultTimeStart,
      itemsData,
      availability,
      itemAvailability: [],
      itemSelected: {},
      weeksAdvance: 1, // Config
      weekDay: 1, // Config
    };
    // this.filterAvailabiliytById = this.filterAvailabiliytById.bind(this);
  }
  componentDidMount() {}

  nextWeekDay() {
    let weekDay = this.state.weekDay;
    if (weekDay <= 6) {
      this.setState({
        weekDay: weekDay + 1,
      });
    }
    this.setState({
      defaultTimeStart: moment().startOf("isoWeek").add(weekDay).week(15),
    });
    console.log(this.state.weekDay);
  }

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

  filterAvailabiliyById: any = (itemGroup: string) => {
    const availability = this.state.availability.filter((v) => {
      console.log(v.id);
      console.log(itemGroup);
      if (v.id === itemGroup) {
        return v;
      }
    });
    return availability;
  };

  /**
   * consider the array by dates must have the day number of the week to calculate the constraints by day
   */
  resizeValidator(action: any, item: any, time: any, resizeEdge: any): any {
    const start = moment(item.start);
    const end = moment(item.end);
    const diff = end.diff(start, "hours");
    const timeShifted = moment(time).add(diff, "hours");

    const weekDayWorking = moment(time).weekday();
    console.log(this.state.itemAvailability[0].data);
    const availabilityData = this.state.itemAvailability[0].data.filter((v) => {
      return v.type === 1;
    });
    console.log(availabilityData);
    // if (
    //   timeShifted.valueOf() > moment().startOf("day").add(16, "hours").valueOf()
    // ) {
    //   var newTime1 =
    //     Math.ceil(
    //       moment()
    //         .startOf("day")
    //         .add(16 - diff, "hours")
    //         .valueOf() / 1000
    //     ) * 1000;

    //   return newTime1;
    // }
    // if (time < moment().startOf("day").add(5, "hours").valueOf()) {
    //   var newTime1 =
    //     Math.ceil(moment().startOf("day").add(5, "hours").valueOf() / 1000) *
    //     1000;

    //   return newTime1;
    // }
    return time;
  }
  handleItemMove: any = (itemId: any, dragTime: any, newGroupOrder: any) => {
    // console.log(this.state);
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

    // console.log("Moved", itemId, dragTime, newGroupOrder);
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

  handleItemSelected(itemId: any, e: any, time: any): void {
    const groupSelected = this.state.itemsData.filter((v) => {
      if (v.id === itemId) {
        return v;
      }
    })[0];
    // this.setState({
    //   itemSelected: groupSelected,
    // });
    const availability = this.filterAvailabiliyById(groupSelected.group);
    this.setState({
      itemSelected: groupSelected,
      itemAvailability: availability,
    });
  }

  renderTags(): any {
    const list = this.state.groups.map((v) => <li>{v.title}</li>);
    return list;
  }

  render(): any {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

    return (
      <>
        <button>Atras</button>
        <button onClick={this.nextWeekDay.bind(this)}>Adelante</button>
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
          moveResizeValidator={this.resizeValidator.bind(this)}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          onItemSelect={this.handleItemSelected.bind(this)}
          visibleTimeStart={defaultTimeStart}
          visibleTimeEnd={defaultTimeEnd}
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
        <div>
          <div>id: {this.state.itemSelected.group}</div>
          <div>name: {this.state.itemSelected.title}</div>
        </div>
        <div>
          <h2>Employees</h2>
          <ul>{this.renderTags()}</ul>
        </div>
      </>
    );
  }
}
