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
    group: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
    title: "LUNCH",
    start: moment().startOf("day").add(10, "hours").toDate(),
    end: moment().startOf("day").add(11, "hours").toDate(),
    itemProps: {
      "data-tip": "LUNCH",
    },
  },
  {
    id: "3",
    group: "02b015b6-155d-49a9-98cb-d42c6ad76cfd",
    title: "JOSEFA ORTIZ DE DOMINGUEZ",
    start: moment().startOf("day").add(8, "hours").toDate(),
    end: moment().startOf("day").add(12, "hours").toDate(),
    itemProps: {
      "data-tip": "JOSEFA ORTIZ DE DOMINGUEZ",
    },
  },
];

export const availability = [
  {
    id: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
    name: "NEFI LOPEZ GARCIA",
    data: [
      {
        idEmployee: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
        type: 6, // Availability
        start: 12,
        end: 10,
        dayOfWeek: 1,
        active: true,
      },
      {
        idEmployee: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
        type: 1, // Availability
        start: 12,
        end: 10,
        dayOfWeek: 7,
        active: true,
      },
      {
        idEmployee: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
        type: 1, // Availability
        start: 12,
        end: 10,
        dayOfWeek: 7,
        active: true,
      },
      {
        idEmployee: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
        type: 2, // day off
        start: moment().startOf("day").add(3, "days").toDate(),
        end: moment().startOf("day").add(3, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
      {
        idEmployee: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
        type: 3, // vacation
        start: moment().startOf("day").add(4, "days").toDate(),
        end: moment().startOf("day").add(4, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
      {
        idEmployee: "d3d2cbe8-b1b5-4a93-86b8-741fa09c2c60",
        type: 4, // sick day
        start: moment().startOf("day").add(4, "days").toDate(),
        end: moment().startOf("day").add(4, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
    ],
  },
  {
    id: "02b015b6-155d-49a9-98cb-d42c6ad76cfd",
    name: "JOSE ORTIZ DE DOMINGUEZ",
    data: [
      {
        idEmployee: "02b015b6-155d-49a9-98cb-d42c6ad76cfd",
        type: 4, // sick day
        start: moment().startOf("day").add(4, "days").toDate(),
        end: moment().startOf("day").add(4, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
    ],
  },
];
