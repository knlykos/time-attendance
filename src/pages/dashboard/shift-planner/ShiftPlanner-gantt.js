import React, { useCallback, useEffect } from "react";

import GSTC from "gantt-schedule-timeline-calendar";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";

import "gantt-schedule-timeline-calendar/dist/style.css";
// import "./App.css";

let gstc, state;

// helper functions

function initializeGSTC(element) {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */
  const rowsFromDB = [
    {
      id: "1",
      label: "Row 1",
    },
    {
      id: "2",
      label: "Row 2",
    },
  ];
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const itemsFromDB = [
    {
      id: "1",
      label: "Item 1",
      rowId: "1",
      time: {
        start: GSTC.api.date("2020-01-01 00:15:00").valueOf(),
        end: GSTC.api.date("2020-01-02 00:00:00").endOf("hour").valueOf(),
      },
    },
    {
      id: "2",
      label: "Item 2",
      rowId: "1",
      time: {
        start: GSTC.api.date("2020-01-01 08:00:00").startOf("hour").valueOf(),
        end: GSTC.api.date("2020-01-01 10:15:00").endOf("hour").valueOf(),
      },
    },
  ];

  const columnsFromDB = [
    {
      id: "id",
      label: "ID",
      data: ({ row }) => Number(GSTC.api.sourceID(row.id)), // show original id
      sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
      width: 80,
      header: {
        content: "ID",
      },
    },
    {
      id: "label",
      data: "label",
      sortable: "label",
      isHTML: false,
      width: 80,
      header: {
        content: "Label",
      },
    },
  ];

  const hours = [
    {
      zoomTo: 100, // we want to display this format for all zoom levels until 100
      period: "hour",
      periodIncrement: 1,
      format({ timeStart }) {
        return timeStart.format("HH:mm DD MMMM YYYY"); // full list of formats: https://day.js.org/docs/en/display/format
      },
    },
  ];

  const minutes = [
    {
      zoomTo: 100, // we want to display this format for all zoom levels until 100
      period: "minute",
      periodIncrement: 15,
      main: true,
      format({ timeStart, vido }) {
        return vido.html`<div style="text-align:center;">${timeStart.format(
          "HH:mm"
        )}</div>`; // full list of formats: https://day.js.org/docs/en/display/format
      },
    },
  ];

  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */
  const config = {
    // for free key for your domain please visit https://gstc.neuronet.io/free-key
    // if you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing

    licenseKey:
      "====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====",

    list: {
      columns: {
        data: GSTC.api.fromArray(columnsFromDB),
      },
      rows: GSTC.api.fromArray(rowsFromDB),
    },
    chart: {
      items: GSTC.api.fromArray(itemsFromDB),
      calendarLevels: [hours, minutes],
      time: {
        zoom: 14,
        from: GSTC.api.date("2020-01-01").startOf("day").valueOf(),
        to: GSTC.api.date("2020-01-02").endOf("day").valueOf(),
      },
    },
  };
  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

function updateFirstRow() {
  state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row) => {
    row.label = "Changed dynamically";
    return row;
  });
}

function ShiftPlannerGantt() {
  const callback = useCallback((element) => {
    if (element) initializeGSTC(element);
  }, []);

  useEffect(() => {
    return () => {
      if (gstc) {
        gstc.destroy();
      }
    };
  });

  function updateFirstRow() {
    console.log(`config.list.rows.${GSTC.api.GSTCID("1")}`);
    state.update(`config.list.rows.${GSTC.api.GSTCID("1")}`, (row) => {
      row.label = "Changed dynamically";
      return row;
    });
  }

  function changeZoomLevel() {
    // state.update("config.chart.time.zoom", 20);
    // state.update("config.chart.time.period", 'years');
  }

  return (
    <>
      <div className="gstc-wrapper" ref={callback}></div>
      <button onClick={updateFirstRow}>>Agregar new Row</button>
    </>
  );
}

export default ShiftPlannerGantt;
