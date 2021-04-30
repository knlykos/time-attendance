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
} from "react-calendar-timeline";
import { Employee } from "../../models/employee";

type State = {
  groups: any[];
  items: any[];
  defaultTimeEnd: Date;
  defaultTimeStart: Date;
  itemsData: any[];
  availability: any[];
  itemSelected: any;
  itemAvailability: any[];
  weeksAdvance: number;
  weekDay: number;
  contextMenuVisibility: boolean;
  newItem: { groupId: number; time: number };
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
  firstDayOfWeek = moment().day(1).startOf("isoWeek").week(15);
  lastDayOfWeek = moment(this.firstDayOfWeek).add(6, "days");
  defaultTimeStart = this.firstDayOfWeek.toDate();
  defaultTimeEnd = this.firstDayOfWeek.add(1, "day").toDate();
  constructor(props: { data: Date }) {
    super(props);
    console.log(itemsData);
    this.getEmployees();
    let groups = [{ id: 1, title: "NEFI" }];
    let items = itemsData;
    console.log(items);
    // const firstDayOfWeek = moment().day(1).startOf("isoWeek").week(15);
    // const lastDayOfWeek = moment(firstDayOfWeek).add(6, "days");
    // const defaultTimeStart = firstDayOfWeek.toDate();
    // const defaultTimeEnd = firstDayOfWeek.add(1, "day").toDate();
    // const weekDay = 1;
    console.log(this.firstDayOfWeek);
    console.log(this.lastDayOfWeek);
    this.state = {
      groups,
      items,
      defaultTimeEnd: this.defaultTimeEnd,
      defaultTimeStart: this.defaultTimeStart,
      itemsData,
      availability,
      itemAvailability: [],
      itemSelected: {},
      weeksAdvance: 1, // Config
      weekDay: 1, // Config
      contextMenuVisibility: false,
      newItem: {
        groupId: 0,
        time: 0,
      },
    };
    // this.filterAvailabiliytById = this.filterAvailabiliytById.bind(this);
  }
  componentDidMount() {}

  nextWeekDay() {
    let weekDay = this.state.weekDay;
    weekDay = weekDay + 1;
    if (weekDay <= 7) {
      this.setState({
        weekDay: weekDay,
      });
      this.setState({
        defaultTimeStart: moment()
          .startOf("isoWeek")
          .add(this.state.weekDay, "day")
          .toDate(),
        defaultTimeEnd: moment()
          .startOf("isoWeek")
          .add(this.state.weekDay + 1, "day")
          .toDate(),
      });
    }
  }

  backWeekDay() {
    let weekDay = this.state.weekDay;
    weekDay = weekDay - 1;
    if (weekDay >= 1) {
      this.setState({
        weekDay: weekDay,
      });
      this.setState({
        defaultTimeStart: moment()
          .startOf("isoWeek")
          .add(this.state.weekDay - 2, "day")

          .toDate(),
        defaultTimeEnd: moment()
          .startOf("isoWeek")
          .add(this.state.weekDay - 1, "day")
          .toDate(),
      });
    }
  }

  async getEmployees() {
    const employees = await (
      await axios.get<any, AxiosResponse<Employee[]>>(
        "http://192.168.0.72:3001/employees/find-all"
      )
    ).data;
    this.setState({ groups: this.createGroups(employees) });
  }

  createGroups(employees: Employee[]): any[] {
    return employees.map((v) => {
      return {
        id: v.id,
        title: v.firstname + " " + v.lastname,
      };
    });
  }

  filterAvailabiliyById: any = (itemGroup: any) => {
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
    const availabilityData = this.state.itemAvailability[0].data.filter(
      (v: any) => {
        return v.type === 1;
      }
    );
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
    const list = this.state.groups.map((v) => {
      return (
        <li>
          {v.title}{" "}
          <div>
            <button>-</button>
            <button>+</button>
          </div>
        </li>
      );
    });
    return list;
  }

  onCanvasClick(groupId: any, time: any, e: any) {
    console.log("groupId", groupId);
    console.log("e", e);
    console.log("time", time);
    let { contextMenuVisibility } = this.state;
    contextMenuVisibility = !contextMenuVisibility;
    this.setState({
      contextMenuVisibility: contextMenuVisibility,
      newItem: { groupId: groupId, time: time },
    });
    // this.newItem();
  }

  // this function most to filter by group and date and employee time-type.
  createItem() {
    const { newItem } = this.state;
    console.log(this.state.items);
    const dataFiltered = this.state.items
      .filter((v) => v.group === newItem.groupId)
      .filter(
        (v) => new Date(v.start).getDay() === new Date(newItem.time).getDay()
      );
    console.log(dataFiltered);
  }

  contextMenu() {
    let { contextMenuVisibility } = this.state;
    return (
      <div style={{ visibility: contextMenuVisibility ? "visible" : "hidden" }}>
        <button onClick={this.createItem.bind(this)}>+</button>
      </div>
    );
  }

  onCanvasContextMenu(itemId: any, e: any, time: any) {
    console.log(itemId);
    console.log(e);
    console.log(time);
  }

  render(): any {
    const {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      itemSelected,
      weekDay,
    } = this.state;

    return (
      <>
        <button onClick={this.backWeekDay.bind(this)}>Atras</button>
        <button onClick={this.nextWeekDay.bind(this)}>Adelante</button>
        {weekDay}
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          sidebarContent={<div>Above The Left</div>}
          //@ts-ignore
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
          onCanvasContextMenu={this.onCanvasContextMenu.bind(this)}
          onCanvasClick={this.onCanvasClick.bind(this)}
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
        <div>{this.contextMenu()}</div>
        <div>
          <div>id: {itemSelected.group}</div>
          <div>name: {itemSelected.title}</div>
        </div>
        <div>
          <h2>Employees</h2>
          <ul>{this.renderTags()}</ul>
        </div>
      </>
    );
  }
}
