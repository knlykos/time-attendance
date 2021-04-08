import moment from "moment";
export const itemsData = [
  {
    id: "1",
    group: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
    title: "NEFI LOPEZ GARCIA",
    start: moment().startOf("day").add(6, "hours").toDate(),
    end: moment().startOf("day").add(15, "hours").toDate(),
    itemProps: {
      "data-tip": "NEFI LOPEZ GARCIA",
    },
  },
  {
    id: "2",
    group: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
    title: "LUNCH",
    start: moment().startOf("day").add(10, "hours").toDate(),
    end: moment().startOf("day").add(11, "hours").toDate(),
    itemProps: {
      "data-tip": "LUNCH",
    },
  },
  {
    id: "3",
    group: "19579e64-fff9-457f-a267-3c96f1e2a21e",
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
    id: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
    name: "NEFI LOPEZ GARCIA",
    data: [
      {
        idEmployee: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
        type: 6, // Availability
        start: 12,
        end: 10,
        dayOfWeek: 1,
        active: true,
      },
      {
        idEmployee: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
        type: 1, // Availability
        start: 12,
        end: 10,
        dayOfWeek: 7,
        active: true,
      },
      {
        idEmployee: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
        type: 1, // Availability
        start: 12,
        end: 10,
        dayOfWeek: 7,
        active: true,
      },
      {
        idEmployee: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
        type: 2, // day off
        start: moment().startOf("day").add(3, "days").toDate(),
        end: moment().startOf("day").add(3, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
      {
        idEmployee: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
        type: 3, // vacation
        start: moment().startOf("day").add(4, "days").toDate(),
        end: moment().startOf("day").add(4, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
      {
        idEmployee: "231e90f4-f2b9-4cf2-af26-7cd403a60e88",
        type: 4, // sick day
        start: moment().startOf("day").add(4, "days").toDate(),
        end: moment().startOf("day").add(4, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
    ],
  },
  {
    id: "19579e64-fff9-457f-a267-3c96f1e2a21e",
    name: "KIMBERLY SION CARRILLO",
    data: [
      {
        idEmployee: "19579e64-fff9-457f-a267-3c96f1e2a21e",
        type: 4, // sick day
        start: moment().startOf("day").add(4, "days").toDate(),
        end: moment().startOf("day").add(4, "days").toDate(),
        dayOfWeek: 0,
        active: true,
      },
    ],
  },
];
