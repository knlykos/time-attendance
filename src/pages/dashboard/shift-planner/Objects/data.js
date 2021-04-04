import moment from "moment";
export const itemsData = [
  {
    id: "1",
    group: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
    title: "NEFI LOPEZ GARCIA",
    start: moment().startOf("day").add(6, "hours").toDate(),
    end: moment().startOf("day").add(15, "hours").toDate(),
    itemProps: {
      "data-tip": "NEFI LOPEZ GARCIA",
    },
  },
  {
    id: "2",
    group: "02b015b6-155d-49a9-98cb-d42c6ad76cfd",
    title: "NEFI LOPEZ GARCIA",
    start: moment().startOf("day").add(8, "hours").toDate(),
    end: moment().startOf("day").add(20, "hours").toDate(),
    itemProps: {
      "data-tip": "NEFI LOPEZ GARCIA",
    },
  },
];

export const availability = [
  {
    id: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
    type: 0,
    start: null,
    end: null,
  },
  {
    id: "02b015b6-155d-49a9-98cb-d42c6ad76cfd",
    type: 1,
    start: moment().startOf("day").add(12, "hours").toDate(),
    end: moment().startOf("day").add(24, "hours").toDate(),
  },
];
