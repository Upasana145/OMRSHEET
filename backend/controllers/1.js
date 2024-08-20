// function type_config(data) {
//   const result = {};

//   data.forEach((item) => {
//     if (item.mode === "parent") {
//       let typeName = item.type;
//       let options = {};
//       let length = 0;

//       item.children.forEach((child, index) => {
//         options[index] = child.name;
//         length++;
//       });

//       // Adding "RR" options
//       if (length < 12) {
//         options[length] = "RR";
//         options[length + 1] = "RR";
//       }

//       result[typeName] = {
//         OPTIONS: options,
//         LENGTH: length,
//       };
//     }
//   });

//   return result;
// }

// // Example usage
// const inputData = [
//   {
//     id: 534208,
//     name: "an1",
//     start: {
//       x: 126.5,
//       y: 72,
//     },
//     end: {
//       x: 142.5,
//       y: 90,
//     },
//     mode: "anchor",
//     type: "anchor",
//     height: 18,
//     width: 16,
//   },
//   {
//     id: 642752,
//     name: "an2",
//     mode: "anchor",
//     type: "anchor",
//     height: 18,
//     width: 15,
//   },

//   {
//     id: 266752,
//     name: "Qn1",
//     mode: "parent",
//     type: "Question",
//     height: 20,
//     width: 145,
//     children: [
//       {
//         id: 448576,
//         mode: "child",
//         type: "option",
//         height: 14,
//         width: 22,
//         name: "a",
//       },
//       {
//         id: 501056,
//         mode: "child",
//         type: "option",
//         height: 14,
//         width: 21,
//         name: "b",
//       },
//       {
//         id: 132928,
//         mode: "child",
//         type: "option",
//         height: 13,
//         width: 21,
//         name: "c",
//       },
//       {
//         id: 516096,
//         mode: "child",
//         type: "option",
//         height: 14,
//         width: 18,
//         name: "d",
//       },
//     ],
//     isOpen: false,
//   },
//   {
//     id: 710528,
//     name: "Qn2",
//     mode: "parent",
//     type: "Question",
//     height: 20,
//     width: 145,
//     children: [
//       {
//         id: 118144,
//         mode: "child",
//         type: "option",
//         height: 14,
//         width: 22,
//         name: "a",
//       },
//       {
//         id: 488832,
//         mode: "child",
//         type: "option",
//         height: 14,
//         width: 21,
//         name: "b",
//       },
//       {
//         id: 383616,
//         mode: "child",
//         type: "option",
//         height: 13,
//         width: 21,
//         name: "c",
//       },
//       {
//         id: 327040,
//         mode: "child",
//         type: "option",
//         height: 14,
//         width: 18,
//         name: "d",
//       },
//     ],
//     isOpen: true,
//   },

//   {
//     id: 139200,
//     name: "fn1",
//     mode: "parent",
//     type: "Form_no_parent",
//     height: 208.33333333333326,
//     width: 16.666666666666657,
//     children: [
//       {
//         id: 745088,
//         start: {
//           x: 192.91666666666663,
//           y: 510,
//         },
//         end: {
//           x: 202.91666666666663,
//           y: 532.5,
//         },
//         mode: "child1",
//         type: "number",
//         height: 22.500000000000057,
//         width: 10,
//         name: "a",
//       },
//       {
//         id: 188544,
//         mode: "child",
//         type: "option",
//         height: 14.166666666666742,
//         width: 11.666666666666657,
//         name: "b",
//       },
//       {
//         id: 343168,
//         mode: "child",
//         type: "option",
//         height: 15,
//         width: 11.666666666666657,
//         name: "c",
//       },
//       {
//         id: 577920,
//         mode: "child",
//         type: "option",
//         height: 11.666666666666629,
//         width: 11.666666666666657,
//         name: "d",
//       },
//       {
//         id: 168512,
//         mode: "child",
//         type: "option",
//         height: 16.66666666666663,
//         width: 10,
//         name: "e",
//       },
//       {
//         id: 961216,
//         mode: "child",
//         type: "option",
//         height: 16.66666666666663,
//         width: 12.5,
//         name: "f",
//       },
//       {
//         id: 276352,
//         mode: "child",
//         type: "option",
//         height: 13.333333333333371,
//         width: 10.833333333333343,
//         name: "g",
//       },
//       {
//         id: 403136,
//         mode: "child",
//         type: "option",
//         height: 14.166666666666629,
//         width: 11.666666666666657,
//         name: "h",
//       },
//       {
//         id: 327296,
//         mode: "child",
//         type: "option",
//         height: 15,
//         width: 13.333333333333343,
//         name: "i",
//       },
//       {
//         id: 994624,
//         mode: "child",
//         type: "option",
//         height: 16.66666666666663,
//         width: 13.333333333333314,
//         name: "j",
//       },
//       {
//         id: 855360,
//         mode: "child",
//         type: "option",
//         height: 16.923076923076906,
//         width: 11.538461538461547,
//         name: "k",
//       },
//     ],
//     isOpen: true,
//   },

//   {
//     id: 663296,
//     name: "htn1",
//     mode: "parent",
//     type: "hall_ticket_no_parent",

//     height: 209.09090909090912,
//     width: 14.545454545454561,
//     children: [
//       {
//         id: 363520,
//         mode: "child1",
//         type: "number",
//         height: 23.636363636363626,
//         width: 11.818181818181813,
//         name: "a",
//       },
//       {
//         id: 650112,
//         mode: "child",
//         type: "option",

//         height: 16.363636363636374,
//         width: 10,
//         name: "b",
//       },
//       {
//         id: 771840,
//         mode: "child",
//         type: "option",

//         height: 16.363636363636374,
//         width: 10,
//         name: "c",
//       },
//       {
//         id: 920000,
//         mode: "child",
//         type: "option",

//         height: 15.454545454545496,
//         width: 10.909090909090907,
//         name: "d",
//       },
//       {
//         id: 960384,
//         mode: "child",
//         type: "option",

//         height: 18.181818181818244,
//         width: 11.818181818181813,
//         name: "e",
//       },
//       {
//         id: 769664,
//         mode: "child",
//         type: "option",

//         height: 15.454545454545496,
//         width: 10,
//         name: "f",
//       },
//       {
//         id: 705856,
//         mode: "child",
//         type: "option",

//         height: 18.18181818181813,
//         width: 10.909090909090907,
//         name: "g",
//       },
//       {
//         id: 352640,
//         mode: "child",
//         type: "option",

//         height: 16.363636363636374,
//         width: 10,
//         name: "h",
//       },
//       {
//         id: 383168,
//         mode: "child",
//         type: "option",

//         height: 14.545454545454504,
//         width: 10.909090909090907,
//         name: "i",
//       },
//       {
//         id: 211328,

//         mode: "child",
//         type: "option",

//         height: 17.272727272727366,
//         width: 10.909090909090907,
//         name: "j",
//       },
//       {
//         id: 981568,
//         mode: "child",
//         type: "option",

//         height: 12.727272727272748,
//         width: 12.72727272727272,
//         name: "k",
//       },
//     ],
//     isOpen: false,
//   },
//   {
//     id: 533184,
//     name: "htn3",
//     mode: "parent",
//     type: "hall_ticket_no_parent",

//     height: 209.09090909090912,
//     width: 14.545454545454561,
//     children: [
//       {
//         id: 728000,

//         mode: "child1",
//         type: "number",
//         height: 23.636363636363626,
//         width: 11.818181818181813,
//         name: "a",
//       },
//       {
//         id: 933056,

//         mode: "child",
//         type: "option",

//         height: 16.363636363636374,
//         width: 10,
//         name: "b",
//       },
//       {
//         id: 261568,

//         mode: "child",
//         type: "option",

//         height: 16.363636363636374,
//         width: 10,
//         name: "c",
//       },
//       {
//         id: 501184,
//         mode: "child",
//         type: "option",

//         height: 15.454545454545496,
//         width: 10.909090909090907,
//         name: "d",
//       },
//       {
//         id: 837824,

//         mode: "child",
//         type: "option",

//         height: 18.181818181818244,
//         width: 11.818181818181813,
//         name: "e",
//       },
//       {
//         id: 117952,

//         mode: "child",
//         type: "option",

//         height: 15.454545454545496,
//         width: 10,
//         name: "f",
//       },
//       {
//         id: 979136,

//         mode: "child",
//         type: "option",

//         height: 18.18181818181813,
//         width: 10.909090909090907,
//         name: "g",
//       },
//       {
//         id: 898496,

//         mode: "child",
//         type: "option",

//         height: 16.363636363636374,
//         width: 10,
//         name: "h",
//       },
//       {
//         id: 571840,

//         mode: "child",
//         type: "option",

//         height: 14.545454545454504,
//         width: 10.909090909090907,
//         name: "i",
//       },
//       {
//         id: 314304,

//         mode: "child",
//         type: "option",

//         height: 17.272727272727366,
//         width: 10.909090909090907,
//         name: "j",
//       },
//       {
//         id: 500416,

//         mode: "child",
//         type: "option",

//         height: 12.727272727272748,
//         width: 12.72727272727272,
//         name: "k",
//       },
//     ],
//     isOpen: false,
//   },

//   {
//     id: 630656,
//     name: "",

//     mode: "parent",
//     type: "test_booklet_parent",
//     height: 208.18181818181813,
//     width: 16.363636363636317,
//     children: [
//       {
//         id: 188032,

//         mode: "child1",
//         type: "number",
//         height: 22.727272727272748,
//         width: 11.818181818181813,
//         name: "a",
//       },
//       {
//         id: 107584,
//         mode: "child",
//         type: "option",
//         height: 15.454545454545496,
//         width: 10,
//         name: "b",
//       },
//       {
//         id: 347200,

//         mode: "child",
//         type: "option",
//         height: 17.272727272727252,
//         width: 13.636363636363626,
//         name: "c",
//       },
//       {
//         id: 197312,

//         mode: "child",
//         type: "option",
//         height: 16.363636363636374,
//         width: 11.818181818181813,
//         name: "d",
//       },
//       {
//         id: 696384,
//         mode: "child",
//         type: "option",
//         height: 17.272727272727252,
//         width: 12.727272727272748,
//         name: "e",
//       },
//       {
//         id: 594624,

//         mode: "child",
//         type: "option",
//         height: 13.636363636363626,
//         width: 13.636363636363626,
//         name: "f",
//       },
//       {
//         id: 534656,

//         mode: "child",
//         type: "option",
//         height: 17.272727272727366,
//         width: 14.545454545454561,
//         name: "g",
//       },
//       {
//         id: 641472,

//         mode: "child",
//         type: "option",
//         height: 16.363636363636374,
//         width: 12.727272727272748,
//         name: "h",
//       },
//       {
//         id: 893888,

//         mode: "child",
//         type: "option",
//         height: 17.272727272727252,
//         width: 11.818181818181813,
//         name: "i",
//       },
//       {
//         id: 956224,

//         mode: "child",
//         type: "option",
//         height: 16.363636363636374,
//         width: 14.545454545454561,
//         name: "j",
//       },
//       {
//         id: 728320,

//         mode: "child",
//         type: "option",
//         height: 15.454545454545496,
//         width: 11.818181818181813,
//         name: "k",
//       },
//     ],
//     isOpen: false,
//   },
// ];

// console.log(type_config(inputData));

function type_config(items) {
  const config = {};

  items.forEach((item) => {
    if (item.mode === "parent") {
      if (item.children && item.children.length > 0) {
        const options = {};
        item.children.forEach((child, index) => {
          options[index] = child.name;
        });
        // Adding "RR" to the options
        const length = item.children.length;
        options[length] = "RR";
        options[length + 1] = "RR";

        config[item.type] = {
          OPTIONS: options,
          LENGTH: length,
        };
      } else {
        config[item.type] = {
          OPTIONS: { 0: "RR", 1: "RR" },
          LENGTH: 0,
        };
      }
    }
  });

  return config;
}

// Example usage
const items = [
  {
    id: 306240,
    name: "username",
    start: {
      x: 127.5,
      y: 421,
    },
    end: {
      x: 735.5,
      y: 462,
    },
    mode: "parent",
    type: "name",
    height: 41,
    width: 608,
  },

  {
    id: 534208,
    name: "an1",
    start: {
      x: 126.5,
      y: 72,
    },
    end: {
      x: 142.5,
      y: 90,
    },
    mode: "parent",
    type: "anchor",
    height: 18,
    width: 16,
  },
  {
    id: 642752,
    name: "an2",
    start: {
      x: 745.5,
      y: 78,
    },
    end: {
      x: 760.5,
      y: 96,
    },
    mode: "anchor",
    type: "anchor",
    height: 18,
    width: 15,
  },
  {
    id: 143680,
    name: "an3",
    start: {
      x: 110.5,
      y: 1087,
    },
    end: {
      x: 125.5,
      y: 1103,
    },
    mode: "anchor",
    type: "anchor",
    height: 16,
    width: 15,
  },
  {
    id: 341824,
    name: "an4",
    start: {
      x: 734.5,
      y: 1092,
    },
    end: {
      x: 749.5,
      y: 1108,
    },
    mode: "anchor",
    type: "anchor",
    height: 16,
    width: 15,
  },

  {
    id: 266752,
    name: "Qn1",
    start: {
      x: 437.5,
      y: 501,
    },
    end: {
      x: 582.5,
      y: 521,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 448576,
        start: {
          x: 468.5,
          y: 505,
        },
        end: {
          x: 490.5,
          y: 519,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 501056,
        start: {
          x: 498.5,
          y: 505,
        },
        end: {
          x: 519.5,
          y: 519,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 132928,
        start: {
          x: 528.5,
          y: 505,
        },
        end: {
          x: 549.5,
          y: 518,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 516096,
        start: {
          x: 558.5,
          y: 505,
        },
        end: {
          x: 576.5,
          y: 519,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 710528,
    name: "Qn2",
    start: {
      x: 437.5,
      y: 519,
    },
    end: {
      x: 582.5,
      y: 539,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 118144,
        start: {
          x: 468.5,
          y: 523,
        },
        end: {
          x: 490.5,
          y: 537,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 488832,
        start: {
          x: 498.5,
          y: 523,
        },
        end: {
          x: 519.5,
          y: 537,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 383616,
        start: {
          x: 528.5,
          y: 523,
        },
        end: {
          x: 549.5,
          y: 536,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 327040,
        start: {
          x: 558.5,
          y: 523,
        },
        end: {
          x: 576.5,
          y: 537,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 947136,
    name: "Qn3",
    start: {
      x: 435.5,
      y: 537,
    },
    end: {
      x: 580.5,
      y: 557,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 452032,
        start: {
          x: 466.5,
          y: 541,
        },
        end: {
          x: 488.5,
          y: 555,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 767168,
        start: {
          x: 496.5,
          y: 541,
        },
        end: {
          x: 517.5,
          y: 555,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 127168,
        start: {
          x: 526.5,
          y: 541,
        },
        end: {
          x: 547.5,
          y: 554,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 476864,
        start: {
          x: 556.5,
          y: 541,
        },
        end: {
          x: 574.5,
          y: 555,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 502976,
    name: "Qn4",
    start: {
      x: 436.5,
      y: 555,
    },
    end: {
      x: 581.5,
      y: 574,
    },
    mode: "parent",
    type: "Question",
    height: 19,
    width: 145,
    children: [
      {
        id: 611840,
        start: {
          x: 466.5,
          y: 558,
        },
        end: {
          x: 489.5,
          y: 572,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 23,
        name: "a",
      },
      {
        id: 461440,
        start: {
          x: 497.5,
          y: 558,
        },
        end: {
          x: 519.5,
          y: 571,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 22,
        name: "b",
      },
      {
        id: 525056,
        start: {
          x: 525.5,
          y: 558,
        },
        end: {
          x: 547.5,
          y: 571,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 22,
        name: "c",
      },
      {
        id: 206528,
        start: {
          x: 552.5,
          y: 560,
        },
        end: {
          x: 577.5,
          y: 571,
        },
        mode: "child",
        type: "option",
        height: 11,
        width: 25,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 537152,
    name: "Qn5",
    start: {
      x: 435.5,
      y: 573,
    },
    end: {
      x: 580.5,
      y: 593,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 996672,
        start: {
          x: 466.5,
          y: 577,
        },
        end: {
          x: 488.5,
          y: 591,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 527424,
        start: {
          x: 496.5,
          y: 577,
        },
        end: {
          x: 517.5,
          y: 591,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 584000,
        start: {
          x: 526.5,
          y: 577,
        },
        end: {
          x: 547.5,
          y: 590,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 233792,
        start: {
          x: 556.5,
          y: 577,
        },
        end: {
          x: 574.5,
          y: 591,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 794816,
    name: "Qn6",
    start: {
      x: 436.5,
      y: 591,
    },
    end: {
      x: 581.5,
      y: 611,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 860096,
        start: {
          x: 467.5,
          y: 595,
        },
        end: {
          x: 489.5,
          y: 609,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 567232,
        start: {
          x: 497.5,
          y: 595,
        },
        end: {
          x: 518.5,
          y: 609,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 793792,
        start: {
          x: 527.5,
          y: 595,
        },
        end: {
          x: 548.5,
          y: 608,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 474048,
        start: {
          x: 557.5,
          y: 595,
        },
        end: {
          x: 575.5,
          y: 609,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 476736,
    name: "Qn7",
    start: {
      x: 437.5,
      y: 607,
    },
    end: {
      x: 582.5,
      y: 627,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 101440,
        start: {
          x: 468.5,
          y: 611,
        },
        end: {
          x: 490.5,
          y: 625,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 460352,
        start: {
          x: 498.5,
          y: 611,
        },
        end: {
          x: 519.5,
          y: 625,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 830016,
        start: {
          x: 528.5,
          y: 611,
        },
        end: {
          x: 549.5,
          y: 624,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 793152,
        start: {
          x: 558.5,
          y: 611,
        },
        end: {
          x: 576.5,
          y: 625,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 695168,
    name: "Qn8",
    start: {
      x: 436.5,
      y: 624,
    },
    end: {
      x: 581.5,
      y: 644,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 924992,
        start: {
          x: 467.5,
          y: 628,
        },
        end: {
          x: 489.5,
          y: 642,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 537408,
        start: {
          x: 497.5,
          y: 628,
        },
        end: {
          x: 518.5,
          y: 642,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 407872,
        start: {
          x: 527.5,
          y: 628,
        },
        end: {
          x: 548.5,
          y: 641,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 359232,
        start: {
          x: 557.5,
          y: 628,
        },
        end: {
          x: 575.5,
          y: 642,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 944384,
    name: "Qn9",
    start: {
      x: 436.5,
      y: 642,
    },
    end: {
      x: 581.5,
      y: 662,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 979712,
        start: {
          x: 467.5,
          y: 646,
        },
        end: {
          x: 489.5,
          y: 660,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 509696,
        start: {
          x: 497.5,
          y: 646,
        },
        end: {
          x: 518.5,
          y: 660,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 216576,
        start: {
          x: 527.5,
          y: 646,
        },
        end: {
          x: 548.5,
          y: 659,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 431104,
        start: {
          x: 557.5,
          y: 646,
        },
        end: {
          x: 575.5,
          y: 660,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 564800,
    name: "Qn10",
    start: {
      x: 436.5,
      y: 661,
    },
    end: {
      x: 581.5,
      y: 681,
    },
    mode: "parent",
    type: "Question",
    height: 20,
    width: 145,
    children: [
      {
        id: 986688,
        start: {
          x: 467.5,
          y: 665,
        },
        end: {
          x: 489.5,
          y: 679,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 22,
        name: "a",
      },
      {
        id: 381760,
        start: {
          x: 497.5,
          y: 665,
        },
        end: {
          x: 518.5,
          y: 679,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 21,
        name: "b",
      },
      {
        id: 164160,
        start: {
          x: 527.5,
          y: 665,
        },
        end: {
          x: 548.5,
          y: 678,
        },
        mode: "child",
        type: "option",
        height: 13,
        width: 21,
        name: "c",
      },
      {
        id: 879424,
        start: {
          x: 557.5,
          y: 665,
        },
        end: {
          x: 575.5,
          y: 679,
        },
        mode: "child",
        type: "option",
        height: 14,
        width: 18,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 126848,
    name: "Qn11",
    start: {
      x: 435.41666666666663,
      y: 680.8333333333333,
    },
    end: {
      x: 582.9166666666666,
      y: 695.8333333333333,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 792768,
        start: {
          x: 468.74999999999994,
          y: 683.3333333333333,
        },
        end: {
          x: 487.9166666666666,
          y: 694.1666666666665,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 496832,
        start: {
          x: 498.74999999999994,
          y: 683.3333333333333,
        },
        end: {
          x: 519.5833333333333,
          y: 693.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 135360,
        start: {
          x: 527.9166666666666,
          y: 682.4999999999999,
        },
        end: {
          x: 547.0833333333333,
          y: 694.1666666666665,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 821312,
        start: {
          x: 557.0833333333333,
          y: 683.3333333333333,
        },
        end: {
          x: 577.9166666666666,
          y: 694.1666666666665,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 736704,
    name: "Qn12",
    start: {
      x: 434.5833333333333,
      y: 698.3333333333333,
    },
    end: {
      x: 582.0833333333333,
      y: 713.3333333333333,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 839872,
        start: {
          x: 467.91666666666663,
          y: 700.8333333333333,
        },
        end: {
          x: 487.08333333333326,
          y: 711.6666666666665,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 768960,
        start: {
          x: 497.91666666666663,
          y: 700.8333333333333,
        },
        end: {
          x: 518.75,
          y: 710.8333333333333,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 913856,
        start: {
          x: 527.0833333333333,
          y: 699.9999999999999,
        },
        end: {
          x: 546.25,
          y: 711.6666666666665,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 532928,
        start: {
          x: 556.25,
          y: 700.8333333333333,
        },
        end: {
          x: 577.0833333333333,
          y: 711.6666666666665,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 508864,
    name: "Qn13",
    start: {
      x: 433.7499999999999,
      y: 715.8333333333331,
    },
    end: {
      x: 581.25,
      y: 730.8333333333331,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 419008,
        start: {
          x: 467.0833333333332,
          y: 718.3333333333331,
        },
        end: {
          x: 486.24999999999983,
          y: 729.1666666666664,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 552128,
        start: {
          x: 497.0833333333332,
          y: 718.3333333333331,
        },
        end: {
          x: 517.9166666666665,
          y: 728.3333333333331,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 419776,
        start: {
          x: 526.25,
          y: 717.4999999999998,
        },
        end: {
          x: 545.4166666666665,
          y: 729.1666666666664,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 837568,
        start: {
          x: 555.4166666666665,
          y: 718.3333333333331,
        },
        end: {
          x: 576.25,
          y: 729.1666666666664,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 254208,
    name: "Qn14",
    start: {
      x: 432.91666666666674,
      y: 733.3333333333331,
    },
    end: {
      x: 580.4166666666669,
      y: 748.3333333333331,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 881408,
        start: {
          x: 466.25000000000006,
          y: 735.8333333333331,
        },
        end: {
          x: 485.4166666666667,
          y: 746.6666666666664,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 881408,
        start: {
          x: 496.25000000000006,
          y: 735.8333333333331,
        },
        end: {
          x: 517.0833333333334,
          y: 745.8333333333331,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 274176,
        start: {
          x: 525.4166666666669,
          y: 734.9999999999998,
        },
        end: {
          x: 544.5833333333334,
          y: 746.6666666666664,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 665344,
        start: {
          x: 554.5833333333334,
          y: 735.8333333333331,
        },
        end: {
          x: 575.4166666666669,
          y: 746.6666666666664,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 355520,
    name: "Qn15",
    start: {
      x: 433.7499999999999,
      y: 750.8333333333331,
    },
    end: {
      x: 581.25,
      y: 765.8333333333331,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 786368,
        start: {
          x: 467.0833333333332,
          y: 753.3333333333331,
        },
        end: {
          x: 486.24999999999983,
          y: 764.1666666666664,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 279744,
        start: {
          x: 497.0833333333332,
          y: 753.3333333333331,
        },
        end: {
          x: 517.9166666666665,
          y: 763.3333333333331,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 366528,
        start: {
          x: 526.25,
          y: 752.4999999999998,
        },
        end: {
          x: 545.4166666666665,
          y: 764.1666666666664,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 425408,
        start: {
          x: 555.4166666666665,
          y: 753.3333333333331,
        },
        end: {
          x: 576.25,
          y: 764.1666666666664,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 903488,
    name: "Qn16",
    start: {
      x: 432.9166666666665,
      y: 768.3333333333333,
    },
    end: {
      x: 580.4166666666667,
      y: 783.3333333333333,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 182080,
        start: {
          x: 466.24999999999983,
          y: 770.8333333333333,
        },
        end: {
          x: 485.41666666666646,
          y: 781.6666666666665,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 753472,
        start: {
          x: 496.24999999999983,
          y: 770.8333333333333,
        },
        end: {
          x: 517.0833333333333,
          y: 780.8333333333333,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 387392,
        start: {
          x: 525.4166666666667,
          y: 769.9999999999999,
        },
        end: {
          x: 544.5833333333333,
          y: 781.6666666666665,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 824640,
        start: {
          x: 554.5833333333333,
          y: 770.8333333333333,
        },
        end: {
          x: 575.4166666666667,
          y: 781.6666666666665,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 564928,
    name: "Qn17",
    start: {
      x: 433.75000000000006,
      y: 786.6666666666665,
    },
    end: {
      x: 581.2500000000001,
      y: 801.6666666666665,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 454848,
        start: {
          x: 467.08333333333337,
          y: 789.1666666666665,
        },
        end: {
          x: 486.25,
          y: 799.9999999999998,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 897472,
        start: {
          x: 497.08333333333337,
          y: 789.1666666666665,
        },
        end: {
          x: 517.9166666666669,
          y: 799.1666666666665,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 416704,
        start: {
          x: 526.2500000000001,
          y: 788.3333333333331,
        },
        end: {
          x: 545.4166666666669,
          y: 799.9999999999998,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 748736,
        start: {
          x: 555.4166666666669,
          y: 789.1666666666665,
        },
        end: {
          x: 576.2500000000001,
          y: 799.9999999999998,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 316480,
    name: "Qn18",
    start: {
      x: 432.0833333333332,
      y: 823.3333333333334,
    },
    end: {
      x: 579.583333333333,
      y: 838.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 619584,
        start: {
          x: 465.4166666666665,
          y: 825.8333333333334,
        },
        end: {
          x: 484.58333333333314,
          y: 836.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 278080,
        start: {
          x: 495.4166666666665,
          y: 825.8333333333334,
        },
        end: {
          x: 516.2499999999998,
          y: 835.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 683328,
        start: {
          x: 524.583333333333,
          y: 825,
        },
        end: {
          x: 543.7499999999998,
          y: 836.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 551488,
        start: {
          x: 553.7499999999998,
          y: 825.8333333333334,
        },
        end: {
          x: 574.583333333333,
          y: 836.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 803904,
    name: "Qn19",
    start: {
      x: 432.9166666666666,
      y: 840.8333333333334,
    },
    end: {
      x: 580.4166666666665,
      y: 855.8333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 453440,
        start: {
          x: 466.2499999999999,
          y: 843.3333333333334,
        },
        end: {
          x: 485.4166666666665,
          y: 854.1666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 905280,
        start: {
          x: 496.2499999999999,
          y: 843.3333333333334,
        },
        end: {
          x: 517.0833333333333,
          y: 853.3333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 659008,
        start: {
          x: 525.4166666666665,
          y: 842.5,
        },
        end: {
          x: 544.5833333333333,
          y: 854.1666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 955712,
        start: {
          x: 554.5833333333333,
          y: 843.3333333333334,
        },
        end: {
          x: 575.4166666666665,
          y: 854.1666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 877824,
    name: "Qn20",
    start: {
      x: 432.0833333333332,
      y: 857.5000000000001,
    },
    end: {
      x: 579.583333333333,
      y: 872.5000000000001,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 695296,
        start: {
          x: 465.4166666666665,
          y: 860.0000000000001,
        },
        end: {
          x: 484.58333333333314,
          y: 870.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 976896,
        start: {
          x: 495.4166666666665,
          y: 860.0000000000001,
        },
        end: {
          x: 516.2499999999998,
          y: 870.0000000000001,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 874240,
        start: {
          x: 524.583333333333,
          y: 859.1666666666667,
        },
        end: {
          x: 543.7499999999998,
          y: 870.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 142336,
        start: {
          x: 553.7499999999998,
          y: 860.0000000000001,
        },
        end: {
          x: 574.583333333333,
          y: 870.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 862784,
    name: "Qn21",
    start: {
      x: 431.2499999999999,
      y: 875.0000000000002,
    },
    end: {
      x: 578.7499999999997,
      y: 890.0000000000002,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 883264,
        start: {
          x: 464.5833333333332,
          y: 877.5000000000002,
        },
        end: {
          x: 483.74999999999983,
          y: 888.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 785472,
        start: {
          x: 494.5833333333332,
          y: 877.5000000000002,
        },
        end: {
          x: 515.4166666666664,
          y: 887.5000000000002,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 667968,
        start: {
          x: 523.7499999999997,
          y: 876.6666666666669,
        },
        end: {
          x: 542.9166666666664,
          y: 888.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 335936,
        start: {
          x: 552.9166666666664,
          y: 877.5000000000002,
        },
        end: {
          x: 573.7499999999997,
          y: 888.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 719168,
    name: "Qn22",
    start: {
      x: 431.24999999999983,
      y: 894.1666666666669,
    },
    end: {
      x: 578.7499999999997,
      y: 909.1666666666669,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 119616,
        start: {
          x: 464.58333333333314,
          y: 896.6666666666669,
        },
        end: {
          x: 483.7499999999998,
          y: 907.5000000000001,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 986432,
        start: {
          x: 494.58333333333314,
          y: 896.6666666666669,
        },
        end: {
          x: 515.4166666666664,
          y: 906.6666666666669,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 643904,
        start: {
          x: 523.7499999999997,
          y: 895.8333333333335,
        },
        end: {
          x: 542.9166666666664,
          y: 907.5000000000001,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 651584,
        start: {
          x: 552.9166666666664,
          y: 896.6666666666669,
        },
        end: {
          x: 573.7499999999997,
          y: 907.5000000000001,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 858432,
    name: "Qn23",
    start: {
      x: 431.2499999999999,
      y: 911.6666666666664,
    },
    end: {
      x: 578.7499999999995,
      y: 926.6666666666664,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 643904,
        start: {
          x: 464.5833333333332,
          y: 914.1666666666664,
        },
        end: {
          x: 483.74999999999983,
          y: 924.9999999999997,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 383040,
        start: {
          x: 494.5833333333332,
          y: 914.1666666666664,
        },
        end: {
          x: 515.4166666666663,
          y: 924.1666666666664,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 362816,
        start: {
          x: 523.7499999999995,
          y: 913.333333333333,
        },
        end: {
          x: 542.9166666666663,
          y: 924.9999999999997,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 451648,
        start: {
          x: 552.9166666666663,
          y: 914.1666666666664,
        },
        end: {
          x: 573.7499999999995,
          y: 924.9999999999997,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 332480,
    name: "Qn24",
    start: {
      x: 430.4166666666664,
      y: 929.1666666666669,
    },
    end: {
      x: 577.9166666666665,
      y: 944.1666666666669,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 529856,
        start: {
          x: 463.7499999999997,
          y: 931.6666666666669,
        },
        end: {
          x: 482.91666666666634,
          y: 942.5000000000001,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 515008,
        start: {
          x: 493.7499999999997,
          y: 931.6666666666669,
        },
        end: {
          x: 514.583333333333,
          y: 941.6666666666669,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 866496,
        start: {
          x: 522.9166666666665,
          y: 930.8333333333335,
        },
        end: {
          x: 542.0833333333333,
          y: 942.5000000000001,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 318144,
        start: {
          x: 552.0833333333333,
          y: 931.6666666666669,
        },
        end: {
          x: 572.9166666666665,
          y: 942.5000000000001,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 465024,
    name: "Qn25",
    start: {
      x: 584.0833333333333,
      y: 502.33333333333337,
    },
    end: {
      x: 731.583333333333,
      y: 517.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 740480,
        start: {
          x: 617.4166666666665,
          y: 504.83333333333337,
        },
        end: {
          x: 636.5833333333331,
          y: 515.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 772992,
        start: {
          x: 647.4166666666665,
          y: 504.83333333333337,
        },
        end: {
          x: 668.2499999999998,
          y: 514.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 565120,
        start: {
          x: 676.583333333333,
          y: 504,
        },
        end: {
          x: 695.7499999999998,
          y: 515.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 392576,
        start: {
          x: 705.7499999999998,
          y: 504.83333333333337,
        },
        end: {
          x: 726.583333333333,
          y: 515.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 199872,
    name: "Qn26",
    start: {
      x: 432.0833333333332,
      y: 803.3333333333334,
    },
    end: {
      x: 579.583333333333,
      y: 818.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 439488,
        start: {
          x: 465.4166666666665,
          y: 805.8333333333334,
        },
        end: {
          x: 484.58333333333314,
          y: 816.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 281792,
        start: {
          x: 495.4166666666665,
          y: 805.8333333333334,
        },
        end: {
          x: 516.2499999999998,
          y: 815.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 210112,
        start: {
          x: 524.583333333333,
          y: 805,
        },
        end: {
          x: 543.7499999999998,
          y: 816.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 127424,
        start: {
          x: 553.7499999999998,
          y: 805.8333333333334,
        },
        end: {
          x: 574.583333333333,
          y: 816.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 234880,
    name: "Qn27",
    start: {
      x: 585.0833333333333,
      y: 521.3333333333334,
    },
    end: {
      x: 732.583333333333,
      y: 536.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 932480,
        start: {
          x: 618.4166666666665,
          y: 523.8333333333334,
        },
        end: {
          x: 637.5833333333331,
          y: 534.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 362880,
        start: {
          x: 648.4166666666665,
          y: 523.8333333333334,
        },
        end: {
          x: 669.2499999999998,
          y: 533.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 792448,
        start: {
          x: 677.583333333333,
          y: 523,
        },
        end: {
          x: 696.7499999999998,
          y: 534.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 220288,
        start: {
          x: 706.7499999999998,
          y: 523.8333333333334,
        },
        end: {
          x: 727.583333333333,
          y: 534.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 785664,
    name: "Qn28",
    start: {
      x: 584.0833333333333,
      y: 538.3333333333334,
    },
    end: {
      x: 731.583333333333,
      y: 553.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 589568,
        start: {
          x: 617.4166666666665,
          y: 540.8333333333334,
        },
        end: {
          x: 636.5833333333331,
          y: 551.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 427264,
        start: {
          x: 647.4166666666665,
          y: 540.8333333333334,
        },
        end: {
          x: 668.2499999999998,
          y: 550.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 321536,
        start: {
          x: 676.583333333333,
          y: 540,
        },
        end: {
          x: 695.7499999999998,
          y: 551.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 777472,
        start: {
          x: 705.7499999999998,
          y: 540.8333333333334,
        },
        end: {
          x: 726.583333333333,
          y: 551.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 481664,
    name: "Qn29",
    start: {
      x: 583.0833333333333,
      y: 557.3333333333334,
    },
    end: {
      x: 730.583333333333,
      y: 572.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 732544,
        start: {
          x: 616.4166666666665,
          y: 559.8333333333334,
        },
        end: {
          x: 635.5833333333331,
          y: 570.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 463744,
        start: {
          x: 646.4166666666665,
          y: 559.8333333333334,
        },
        end: {
          x: 667.2499999999998,
          y: 569.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 141440,
        start: {
          x: 675.583333333333,
          y: 559,
        },
        end: {
          x: 694.7499999999998,
          y: 570.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 950848,
        start: {
          x: 704.7499999999998,
          y: 559.8333333333334,
        },
        end: {
          x: 725.583333333333,
          y: 570.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 654912,
    name: "Qn30",
    start: {
      x: 584.0833333333333,
      y: 574.3333333333334,
    },
    end: {
      x: 731.583333333333,
      y: 589.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 698944,
        start: {
          x: 617.4166666666665,
          y: 576.8333333333334,
        },
        end: {
          x: 636.5833333333331,
          y: 587.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 732224,
        start: {
          x: 647.4166666666665,
          y: 576.8333333333334,
        },
        end: {
          x: 668.2499999999998,
          y: 586.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 107072,
        start: {
          x: 676.583333333333,
          y: 576,
        },
        end: {
          x: 695.7499999999998,
          y: 587.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 819776,
        start: {
          x: 705.7499999999998,
          y: 576.8333333333334,
        },
        end: {
          x: 726.583333333333,
          y: 587.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 684288,
    name: "Qn31",
    start: {
      x: 585.0833333333333,
      y: 592.3333333333334,
    },
    end: {
      x: 732.583333333333,
      y: 607.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 625408,
        start: {
          x: 618.4166666666665,
          y: 594.8333333333334,
        },
        end: {
          x: 637.5833333333331,
          y: 605.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 322560,
        start: {
          x: 648.4166666666665,
          y: 594.8333333333334,
        },
        end: {
          x: 669.2499999999998,
          y: 604.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 727296,
        start: {
          x: 677.583333333333,
          y: 594,
        },
        end: {
          x: 696.7499999999998,
          y: 605.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 523008,
        start: {
          x: 706.7499999999998,
          y: 594.8333333333334,
        },
        end: {
          x: 727.583333333333,
          y: 605.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 770560,
    name: "Qn32",
    start: {
      x: 585.0833333333333,
      y: 610.3333333333334,
    },
    end: {
      x: 732.583333333333,
      y: 625.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 225536,
        start: {
          x: 618.4166666666665,
          y: 612.8333333333334,
        },
        end: {
          x: 637.5833333333331,
          y: 623.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 684032,
        start: {
          x: 648.4166666666665,
          y: 612.8333333333334,
        },
        end: {
          x: 669.2499999999998,
          y: 622.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 644864,
        start: {
          x: 677.583333333333,
          y: 612,
        },
        end: {
          x: 696.7499999999998,
          y: 623.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 440576,
        start: {
          x: 706.7499999999998,
          y: 612.8333333333334,
        },
        end: {
          x: 727.583333333333,
          y: 623.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 428096,
    name: "Qn33",
    start: {
      x: 583.0833333333333,
      y: 628.3333333333334,
    },
    end: {
      x: 730.583333333333,
      y: 643.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 927808,
        start: {
          x: 616.4166666666665,
          y: 630.8333333333334,
        },
        end: {
          x: 635.5833333333331,
          y: 641.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 468544,
        start: {
          x: 646.4166666666665,
          y: 630.8333333333334,
        },
        end: {
          x: 667.2499999999998,
          y: 640.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 939328,
        start: {
          x: 675.583333333333,
          y: 630,
        },
        end: {
          x: 694.7499999999998,
          y: 641.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 509504,
        start: {
          x: 704.7499999999998,
          y: 630.8333333333334,
        },
        end: {
          x: 725.583333333333,
          y: 641.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 754560,
    name: "Qn34",
    start: {
      x: 582.0833333333333,
      y: 645.3333333333334,
    },
    end: {
      x: 729.583333333333,
      y: 660.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 302464,
        start: {
          x: 615.4166666666665,
          y: 647.8333333333334,
        },
        end: {
          x: 634.5833333333331,
          y: 658.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 991872,
        start: {
          x: 645.4166666666665,
          y: 647.8333333333334,
        },
        end: {
          x: 666.2499999999998,
          y: 657.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 269440,
        start: {
          x: 674.583333333333,
          y: 647,
        },
        end: {
          x: 693.7499999999998,
          y: 658.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 803712,
        start: {
          x: 703.7499999999998,
          y: 647.8333333333334,
        },
        end: {
          x: 724.583333333333,
          y: 658.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 588864,
    name: "Qn35",
    start: {
      x: 583.0833333333333,
      y: 663.3333333333334,
    },
    end: {
      x: 730.583333333333,
      y: 678.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 817984,
        start: {
          x: 616.4166666666665,
          y: 665.8333333333334,
        },
        end: {
          x: 635.5833333333331,
          y: 676.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 127040,
        start: {
          x: 646.4166666666665,
          y: 665.8333333333334,
        },
        end: {
          x: 667.2499999999998,
          y: 675.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 143168,
        start: {
          x: 675.583333333333,
          y: 665,
        },
        end: {
          x: 694.7499999999998,
          y: 676.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 117312,
        start: {
          x: 704.7499999999998,
          y: 665.8333333333334,
        },
        end: {
          x: 725.583333333333,
          y: 676.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 637760,
    name: "Qn36",
    start: {
      x: 583.0833333333333,
      y: 681.3333333333334,
    },
    end: {
      x: 730.583333333333,
      y: 696.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 540992,
        start: {
          x: 616.4166666666665,
          y: 683.8333333333334,
        },
        end: {
          x: 635.5833333333331,
          y: 694.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 198464,
        start: {
          x: 646.4166666666665,
          y: 683.8333333333334,
        },
        end: {
          x: 667.2499999999998,
          y: 693.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 163136,
        start: {
          x: 675.583333333333,
          y: 683,
        },
        end: {
          x: 694.7499999999998,
          y: 694.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 889920,
        start: {
          x: 704.7499999999998,
          y: 683.8333333333334,
        },
        end: {
          x: 725.583333333333,
          y: 694.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 602240,
    name: "Qn37",
    start: {
      x: 582.0833333333333,
      y: 699.3333333333334,
    },
    end: {
      x: 729.583333333333,
      y: 714.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 734848,
        start: {
          x: 615.4166666666665,
          y: 701.8333333333334,
        },
        end: {
          x: 634.5833333333331,
          y: 712.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 566400,
        start: {
          x: 645.4166666666665,
          y: 701.8333333333334,
        },
        end: {
          x: 666.2499999999998,
          y: 711.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 890240,
        start: {
          x: 674.583333333333,
          y: 701,
        },
        end: {
          x: 693.7499999999998,
          y: 712.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 720768,
        start: {
          x: 703.7499999999998,
          y: 701.8333333333334,
        },
        end: {
          x: 724.583333333333,
          y: 712.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 698624,
    name: "Qn38",
    start: {
      x: 582.0833333333333,
      y: 716.3333333333334,
    },
    end: {
      x: 729.583333333333,
      y: 731.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 411392,
        start: {
          x: 615.4166666666665,
          y: 718.8333333333334,
        },
        end: {
          x: 634.5833333333331,
          y: 729.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 877824,
        start: {
          x: 645.4166666666665,
          y: 718.8333333333334,
        },
        end: {
          x: 666.2499999999998,
          y: 728.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 179712,
        start: {
          x: 674.583333333333,
          y: 718,
        },
        end: {
          x: 693.7499999999998,
          y: 729.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 202240,
        start: {
          x: 703.7499999999998,
          y: 718.8333333333334,
        },
        end: {
          x: 724.583333333333,
          y: 729.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 334400,
    name: "Qn39",
    start: {
      x: 583.0833333333333,
      y: 734.3333333333334,
    },
    end: {
      x: 730.583333333333,
      y: 749.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 298560,
        start: {
          x: 616.4166666666665,
          y: 736.8333333333334,
        },
        end: {
          x: 635.5833333333331,
          y: 747.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 795456,
        start: {
          x: 646.4166666666665,
          y: 736.8333333333334,
        },
        end: {
          x: 667.2499999999998,
          y: 746.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 591168,
        start: {
          x: 675.583333333333,
          y: 736,
        },
        end: {
          x: 694.7499999999998,
          y: 747.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 215872,
        start: {
          x: 704.7499999999998,
          y: 736.8333333333334,
        },
        end: {
          x: 725.583333333333,
          y: 747.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 429696,
    name: "Qn40",
    start: {
      x: 583.0833333333333,
      y: 752.3333333333334,
    },
    end: {
      x: 730.583333333333,
      y: 767.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 896896,
        start: {
          x: 616.4166666666665,
          y: 754.8333333333334,
        },
        end: {
          x: 635.5833333333331,
          y: 765.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 974208,
        start: {
          x: 646.4166666666665,
          y: 754.8333333333334,
        },
        end: {
          x: 667.2499999999998,
          y: 764.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 929920,
        start: {
          x: 675.583333333333,
          y: 754,
        },
        end: {
          x: 694.7499999999998,
          y: 765.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 935296,
        start: {
          x: 704.7499999999998,
          y: 754.8333333333334,
        },
        end: {
          x: 725.583333333333,
          y: 765.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 824192,
    name: "Qn41",
    start: {
      x: 583.0833333333333,
      y: 770.3333333333334,
    },
    end: {
      x: 730.583333333333,
      y: 785.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 536448,
        start: {
          x: 616.4166666666665,
          y: 772.8333333333334,
        },
        end: {
          x: 635.5833333333331,
          y: 783.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 179328,
        start: {
          x: 646.4166666666665,
          y: 772.8333333333334,
        },
        end: {
          x: 667.2499999999998,
          y: 782.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 368768,
        start: {
          x: 675.583333333333,
          y: 772,
        },
        end: {
          x: 694.7499999999998,
          y: 783.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 228224,
        start: {
          x: 704.7499999999998,
          y: 772.8333333333334,
        },
        end: {
          x: 725.583333333333,
          y: 783.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 324416,
    name: "Qn42",
    start: {
      x: 581.0833333333333,
      y: 824.3333333333334,
    },
    end: {
      x: 728.583333333333,
      y: 839.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 425536,
        start: {
          x: 614.4166666666665,
          y: 826.8333333333334,
        },
        end: {
          x: 633.5833333333331,
          y: 837.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 438848,
        start: {
          x: 644.4166666666665,
          y: 826.8333333333334,
        },
        end: {
          x: 665.2499999999998,
          y: 836.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 817728,
        start: {
          x: 673.583333333333,
          y: 826,
        },
        end: {
          x: 692.7499999999998,
          y: 837.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 288064,
        start: {
          x: 702.7499999999998,
          y: 826.8333333333334,
        },
        end: {
          x: 723.583333333333,
          y: 837.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 408128,
    name: "Qn43",
    start: {
      x: 580.0833333333333,
      y: 806.3333333333334,
    },
    end: {
      x: 727.583333333333,
      y: 821.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 715328,
        start: {
          x: 613.4166666666665,
          y: 808.8333333333334,
        },
        end: {
          x: 632.5833333333331,
          y: 819.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 969792,
        start: {
          x: 643.4166666666665,
          y: 808.8333333333334,
        },
        end: {
          x: 664.2499999999998,
          y: 818.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 119360,
        start: {
          x: 672.583333333333,
          y: 808,
        },
        end: {
          x: 691.7499999999998,
          y: 819.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 945472,
        start: {
          x: 701.7499999999998,
          y: 808.8333333333334,
        },
        end: {
          x: 722.583333333333,
          y: 819.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 160896,
    name: "Qn44",
    start: {
      x: 580.0833333333333,
      y: 786.3333333333334,
    },
    end: {
      x: 727.583333333333,
      y: 801.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 974720,
        start: {
          x: 613.4166666666665,
          y: 788.8333333333334,
        },
        end: {
          x: 632.5833333333331,
          y: 799.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 980608,
        start: {
          x: 643.4166666666665,
          y: 788.8333333333334,
        },
        end: {
          x: 664.2499999999998,
          y: 798.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 494720,
        start: {
          x: 672.583333333333,
          y: 788,
        },
        end: {
          x: 691.7499999999998,
          y: 799.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 413312,
        start: {
          x: 701.7499999999998,
          y: 788.8333333333334,
        },
        end: {
          x: 722.583333333333,
          y: 799.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: true,
  },
  {
    id: 483136,
    name: "Qn45",
    start: {
      x: 581.0833333333333,
      y: 842.3333333333334,
    },
    end: {
      x: 728.583333333333,
      y: 857.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 909376,
        start: {
          x: 614.4166666666665,
          y: 844.8333333333334,
        },
        end: {
          x: 633.5833333333331,
          y: 855.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 667968,
        start: {
          x: 644.4166666666665,
          y: 844.8333333333334,
        },
        end: {
          x: 665.2499999999998,
          y: 854.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 967744,
        start: {
          x: 673.583333333333,
          y: 844,
        },
        end: {
          x: 692.7499999999998,
          y: 855.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 271936,
        start: {
          x: 702.7499999999998,
          y: 844.8333333333334,
        },
        end: {
          x: 723.583333333333,
          y: 855.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 518336,
    name: "Qn46",
    start: {
      x: 580.0833333333333,
      y: 859.3333333333334,
    },
    end: {
      x: 727.583333333333,
      y: 874.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 455104,
        start: {
          x: 613.4166666666665,
          y: 861.8333333333334,
        },
        end: {
          x: 632.5833333333331,
          y: 872.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 524992,
        start: {
          x: 643.4166666666665,
          y: 861.8333333333334,
        },
        end: {
          x: 664.2499999999998,
          y: 871.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 997312,
        start: {
          x: 672.583333333333,
          y: 861,
        },
        end: {
          x: 691.7499999999998,
          y: 872.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 828096,
        start: {
          x: 701.7499999999998,
          y: 861.8333333333334,
        },
        end: {
          x: 722.583333333333,
          y: 872.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 767616,
    name: "Qn47",
    start: {
      x: 581.0833333333333,
      y: 877.3333333333334,
    },
    end: {
      x: 728.583333333333,
      y: 892.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 104832,
        start: {
          x: 614.4166666666665,
          y: 879.8333333333334,
        },
        end: {
          x: 633.5833333333331,
          y: 890.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 781952,
        start: {
          x: 644.4166666666665,
          y: 879.8333333333334,
        },
        end: {
          x: 665.2499999999998,
          y: 889.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 316800,
        start: {
          x: 673.583333333333,
          y: 879,
        },
        end: {
          x: 692.7499999999998,
          y: 890.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 406400,
        start: {
          x: 702.7499999999998,
          y: 879.8333333333334,
        },
        end: {
          x: 723.583333333333,
          y: 890.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 303296,
    name: "Qn48",
    start: {
      x: 581.0833333333333,
      y: 895.3333333333334,
    },
    end: {
      x: 728.583333333333,
      y: 910.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 726144,
        start: {
          x: 614.4166666666665,
          y: 897.8333333333334,
        },
        end: {
          x: 633.5833333333331,
          y: 908.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 742016,
        start: {
          x: 644.4166666666665,
          y: 897.8333333333334,
        },
        end: {
          x: 665.2499999999998,
          y: 907.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 409472,
        start: {
          x: 673.583333333333,
          y: 897,
        },
        end: {
          x: 692.7499999999998,
          y: 908.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 575616,
        start: {
          x: 702.7499999999998,
          y: 897.8333333333334,
        },
        end: {
          x: 723.583333333333,
          y: 908.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 939776,
    name: "Qn49",
    start: {
      x: 580.0833333333333,
      y: 914.3333333333334,
    },
    end: {
      x: 727.583333333333,
      y: 929.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 989440,
        start: {
          x: 613.4166666666665,
          y: 916.8333333333334,
        },
        end: {
          x: 632.5833333333331,
          y: 927.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 649472,
        start: {
          x: 643.4166666666665,
          y: 916.8333333333334,
        },
        end: {
          x: 664.2499999999998,
          y: 926.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 211968,
        start: {
          x: 672.583333333333,
          y: 916,
        },
        end: {
          x: 691.7499999999998,
          y: 927.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 602112,
        start: {
          x: 701.7499999999998,
          y: 916.8333333333334,
        },
        end: {
          x: 722.583333333333,
          y: 927.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },
  {
    id: 710208,
    name: "Qn50",
    start: {
      x: 579.0833333333333,
      y: 931.3333333333334,
    },
    end: {
      x: 726.583333333333,
      y: 946.3333333333334,
    },
    mode: "parent",
    type: "Question",
    height: 15,
    width: 147.5,
    children: [
      {
        id: 650816,
        start: {
          x: 612.4166666666665,
          y: 933.8333333333334,
        },
        end: {
          x: 631.5833333333331,
          y: 944.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 19.16666666666663,
        name: "a",
      },
      {
        id: 868672,
        start: {
          x: 642.4166666666665,
          y: 933.8333333333334,
        },
        end: {
          x: 663.2499999999998,
          y: 943.8333333333334,
        },
        mode: "child",
        type: "option",
        height: 10,
        width: 20.833333333333314,
        name: "b",
      },
      {
        id: 979008,
        start: {
          x: 671.583333333333,
          y: 933,
        },
        end: {
          x: 690.7499999999998,
          y: 944.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 19.16666666666663,
        name: "c",
      },
      {
        id: 394304,
        start: {
          x: 700.7499999999998,
          y: 933.8333333333334,
        },
        end: {
          x: 721.583333333333,
          y: 944.6666666666666,
        },
        mode: "child",
        type: "option",
        height: 10.833333333333258,
        width: 20.83333333333337,
        name: "d",
      },
    ],
    isOpen: false,
  },

  {
    id: 139200,
    name: "fn1",
    start: {
      x: 190.41666666666663,
      y: 506.66666666666663,
    },
    end: {
      x: 207.0833333333333,
      y: 714.9999999999999,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 745088,
        start: {
          x: 192.91666666666663,
          y: 510,
        },
        end: {
          x: 202.91666666666663,
          y: 532.5,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 188544,
        start: {
          x: 192.91666666666663,
          y: 538.3333333333333,
        },
        end: {
          x: 204.5833333333333,
          y: 552.5,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 343168,
        start: {
          x: 192.91666666666663,
          y: 555,
        },
        end: {
          x: 204.5833333333333,
          y: 570,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 577920,
        start: {
          x: 192.91666666666663,
          y: 571.6666666666666,
        },
        end: {
          x: 204.5833333333333,
          y: 583.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 168512,
        start: {
          x: 192.91666666666663,
          y: 586.6666666666666,
        },
        end: {
          x: 202.91666666666663,
          y: 603.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 961216,
        start: {
          x: 193.74999999999994,
          y: 606.6666666666666,
        },
        end: {
          x: 206.24999999999994,
          y: 623.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 276352,
        start: {
          x: 192.91666666666663,
          y: 624.9999999999999,
        },
        end: {
          x: 203.74999999999997,
          y: 638.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 403136,
        start: {
          x: 193.74999999999997,
          y: 639.9999999999999,
        },
        end: {
          x: 205.41666666666663,
          y: 654.1666666666665,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 327296,
        start: {
          x: 192.91666666666663,
          y: 658.3333333333333,
        },
        end: {
          x: 206.24999999999997,
          y: 673.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 994624,
        start: {
          x: 192.08333333333331,
          y: 675.8333333333333,
        },
        end: {
          x: 205.41666666666663,
          y: 692.4999999999999,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 855360,
        start: {
          x: 192.69230769230765,
          y: 694.6153846153845,
        },
        end: {
          x: 204.2307692307692,
          y: 711.5384615384614,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: true,
  },
  {
    id: 462336,
    name: "fn2",
    start: {
      x: 220.4166666666666,
      y: 508.2051282051282,
    },
    end: {
      x: 237.08333333333326,
      y: 716.5384615384608,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 261120,
        start: {
          x: 222.9166666666666,
          y: 511.53846153846155,
        },
        end: {
          x: 232.9166666666666,
          y: 534.0384615384608,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 586496,
        start: {
          x: 222.9166666666666,
          y: 539.871794871794,
        },
        end: {
          x: 234.58333333333326,
          y: 554.0384615384608,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 318720,
        start: {
          x: 222.9166666666666,
          y: 556.5384615384608,
        },
        end: {
          x: 234.58333333333326,
          y: 571.5384615384608,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 592896,
        start: {
          x: 222.9166666666666,
          y: 573.2051282051275,
        },
        end: {
          x: 234.58333333333326,
          y: 584.871794871794,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 152832,
        start: {
          x: 222.9166666666666,
          y: 588.2051282051275,
        },
        end: {
          x: 232.9166666666666,
          y: 604.871794871794,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 519680,
        start: {
          x: 223.74999999999991,
          y: 608.2051282051275,
        },
        end: {
          x: 236.24999999999991,
          y: 624.871794871794,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 201984,
        start: {
          x: 222.9166666666666,
          y: 626.5384615384608,
        },
        end: {
          x: 233.74999999999994,
          y: 639.871794871794,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 389632,
        start: {
          x: 223.74999999999994,
          y: 641.5384615384608,
        },
        end: {
          x: 235.4166666666666,
          y: 655.7051282051273,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 641280,
        start: {
          x: 222.9166666666666,
          y: 659.871794871794,
        },
        end: {
          x: 236.24999999999994,
          y: 674.871794871794,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 481280,
        start: {
          x: 222.0833333333333,
          y: 677.371794871794,
        },
        end: {
          x: 235.4166666666666,
          y: 694.0384615384608,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 887808,
        start: {
          x: 222.69230769230762,
          y: 696.1538461538453,
        },
        end: {
          x: 234.23076923076917,
          y: 713.0769230769222,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 447680,
    name: "fn3",
    start: {
      x: 249.64743589743586,
      y: 506.66666666666663,
    },
    end: {
      x: 266.3141025641026,
      y: 714.9999999999995,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 715200,
        start: {
          x: 252.14743589743586,
          y: 510,
        },
        end: {
          x: 262.14743589743586,
          y: 532.4999999999995,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 773056,
        start: {
          x: 252.14743589743586,
          y: 538.3333333333328,
        },
        end: {
          x: 263.8141025641026,
          y: 552.4999999999995,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 676032,
        start: {
          x: 252.14743589743586,
          y: 554.9999999999995,
        },
        end: {
          x: 263.8141025641026,
          y: 569.9999999999995,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 810432,
        start: {
          x: 252.14743589743586,
          y: 571.6666666666663,
        },
        end: {
          x: 263.8141025641026,
          y: 583.3333333333328,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 871104,
        start: {
          x: 252.14743589743586,
          y: 586.6666666666663,
        },
        end: {
          x: 262.14743589743586,
          y: 603.3333333333328,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 402880,
        start: {
          x: 252.98076923076917,
          y: 606.6666666666663,
        },
        end: {
          x: 265.4807692307692,
          y: 623.3333333333328,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 662720,
        start: {
          x: 252.14743589743586,
          y: 624.9999999999995,
        },
        end: {
          x: 262.9807692307692,
          y: 638.3333333333328,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 772288,
        start: {
          x: 252.9807692307692,
          y: 639.9999999999995,
        },
        end: {
          x: 264.64743589743597,
          y: 654.1666666666661,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 852672,
        start: {
          x: 252.14743589743586,
          y: 658.3333333333328,
        },
        end: {
          x: 265.48076923076934,
          y: 673.3333333333328,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 725696,
        start: {
          x: 251.31410256410254,
          y: 675.8333333333328,
        },
        end: {
          x: 264.64743589743597,
          y: 692.4999999999995,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 133056,
        start: {
          x: 251.92307692307688,
          y: 694.6153846153841,
        },
        end: {
          x: 263.4615384615385,
          y: 711.538461538461,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 974528,
    name: "fn4",
    start: {
      x: 278.8782051282051,
      y: 506.66666666666686,
    },
    end: {
      x: 295.54487179487177,
      y: 715,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 318656,
        start: {
          x: 281.3782051282051,
          y: 510.0000000000002,
        },
        end: {
          x: 291.37820512820514,
          y: 532.5,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 395456,
        start: {
          x: 281.3782051282051,
          y: 538.3333333333333,
        },
        end: {
          x: 293.04487179487177,
          y: 552.5,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 169408,
        start: {
          x: 281.3782051282051,
          y: 555,
        },
        end: {
          x: 293.04487179487177,
          y: 570,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 669120,
        start: {
          x: 281.3782051282051,
          y: 571.6666666666667,
        },
        end: {
          x: 293.04487179487177,
          y: 583.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 332224,
        start: {
          x: 281.3782051282051,
          y: 586.6666666666667,
        },
        end: {
          x: 291.37820512820514,
          y: 603.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 548288,
        start: {
          x: 282.21153846153845,
          y: 606.6666666666667,
        },
        end: {
          x: 294.7115384615384,
          y: 623.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 560832,
        start: {
          x: 281.3782051282051,
          y: 625,
        },
        end: {
          x: 292.2115384615385,
          y: 638.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 692160,
        start: {
          x: 282.21153846153845,
          y: 640,
        },
        end: {
          x: 293.87820512820514,
          y: 654.1666666666665,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 157632,
        start: {
          x: 281.3782051282051,
          y: 658.3333333333333,
        },
        end: {
          x: 294.7115384615385,
          y: 673.3333333333333,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 841920,
        start: {
          x: 280.5448717948718,
          y: 675.8333333333333,
        },
        end: {
          x: 293.87820512820514,
          y: 692.5,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 537280,
        start: {
          x: 281.15384615384613,
          y: 694.6153846153845,
        },
        end: {
          x: 292.6923076923077,
          y: 711.5384615384614,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: true,
  },
  {
    id: 550272,
    name: "fn5",
    start: {
      x: 308.1089743589743,
      y: 506.66666666666674,
    },
    end: {
      x: 324.775641025641,
      y: 715,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 641920,
        start: {
          x: 310.60897435897436,
          y: 510,
        },
        end: {
          x: 320.60897435897436,
          y: 532.5000000000002,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 404352,
        start: {
          x: 310.60897435897436,
          y: 538.3333333333335,
        },
        end: {
          x: 322.275641025641,
          y: 552.5000000000002,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 696448,
        start: {
          x: 310.60897435897436,
          y: 555.0000000000002,
        },
        end: {
          x: 322.275641025641,
          y: 570.0000000000002,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 765056,
        start: {
          x: 310.60897435897436,
          y: 571.6666666666667,
        },
        end: {
          x: 322.275641025641,
          y: 583.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 771712,
        start: {
          x: 310.60897435897436,
          y: 586.6666666666667,
        },
        end: {
          x: 320.60897435897436,
          y: 603.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 288640,
        start: {
          x: 311.4423076923076,
          y: 606.6666666666667,
        },
        end: {
          x: 323.9423076923077,
          y: 623.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 729984,
        start: {
          x: 310.60897435897436,
          y: 625,
        },
        end: {
          x: 321.4423076923077,
          y: 638.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 601728,
        start: {
          x: 311.4423076923077,
          y: 640,
        },
        end: {
          x: 323.1089743589743,
          y: 654.1666666666667,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 200064,
        start: {
          x: 310.60897435897436,
          y: 658.3333333333335,
        },
        end: {
          x: 323.9423076923077,
          y: 673.3333333333335,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 668544,
        start: {
          x: 309.775641025641,
          y: 675.8333333333335,
        },
        end: {
          x: 323.1089743589743,
          y: 692.5,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 282752,
        start: {
          x: 310.38461538461536,
          y: 694.6153846153848,
        },
        end: {
          x: 321.9230769230769,
          y: 711.5384615384617,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: true,
  },
  {
    id: 890112,
    name: "fn6",
    start: {
      x: 338.10897435897425,
      y: 508.2051282051283,
    },
    end: {
      x: 354.77564102564094,
      y: 716.5384615384615,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 240896,
        start: {
          x: 340.60897435897425,
          y: 511.53846153846166,
        },
        end: {
          x: 350.60897435897425,
          y: 534.0384615384618,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 714432,
        start: {
          x: 340.60897435897425,
          y: 539.871794871795,
        },
        end: {
          x: 352.27564102564094,
          y: 554.0384615384618,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 792000,
        start: {
          x: 340.60897435897425,
          y: 556.5384615384618,
        },
        end: {
          x: 352.27564102564094,
          y: 571.5384615384618,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 775872,
        start: {
          x: 340.60897435897425,
          y: 573.2051282051283,
        },
        end: {
          x: 352.27564102564094,
          y: 584.871794871795,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 804544,
        start: {
          x: 340.60897435897425,
          y: 588.2051282051283,
        },
        end: {
          x: 350.60897435897425,
          y: 604.871794871795,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 248768,
        start: {
          x: 341.44230769230757,
          y: 608.2051282051283,
        },
        end: {
          x: 353.94230769230757,
          y: 624.871794871795,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 267200,
        start: {
          x: 340.60897435897425,
          y: 626.5384615384615,
        },
        end: {
          x: 351.44230769230757,
          y: 639.871794871795,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 865472,
        start: {
          x: 341.44230769230757,
          y: 641.5384615384615,
        },
        end: {
          x: 353.10897435897425,
          y: 655.7051282051283,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 191936,
        start: {
          x: 340.60897435897425,
          y: 659.871794871795,
        },
        end: {
          x: 353.94230769230757,
          y: 674.871794871795,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 832192,
        start: {
          x: 339.77564102564094,
          y: 677.371794871795,
        },
        end: {
          x: 353.10897435897425,
          y: 694.0384615384615,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 417472,
        start: {
          x: 340.3846153846153,
          y: 696.1538461538463,
        },
        end: {
          x: 351.92307692307685,
          y: 713.0769230769232,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: true,
  },
  {
    id: 621120,
    name: "fn7",
    start: {
      x: 365.801282051282,
      y: 507.4358974358976,
    },
    end: {
      x: 382.4679487179487,
      y: 715.7692307692307,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 815424,
        start: {
          x: 368.301282051282,
          y: 510.76923076923094,
        },
        end: {
          x: 378.301282051282,
          y: 533.269230769231,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 897600,
        start: {
          x: 368.301282051282,
          y: 539.1025641025642,
        },
        end: {
          x: 379.9679487179487,
          y: 553.269230769231,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 995392,
        start: {
          x: 368.301282051282,
          y: 555.769230769231,
        },
        end: {
          x: 379.9679487179487,
          y: 570.769230769231,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 156480,
        start: {
          x: 368.301282051282,
          y: 572.4358974358975,
        },
        end: {
          x: 379.9679487179487,
          y: 584.1025641025642,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 414272,
        start: {
          x: 368.301282051282,
          y: 587.4358974358975,
        },
        end: {
          x: 378.301282051282,
          y: 604.1025641025642,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 185408,
        start: {
          x: 369.1346153846153,
          y: 607.4358974358975,
        },
        end: {
          x: 381.6346153846153,
          y: 624.1025641025642,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 972608,
        start: {
          x: 368.301282051282,
          y: 625.7692307692307,
        },
        end: {
          x: 379.1346153846153,
          y: 639.1025641025642,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 124992,
        start: {
          x: 369.1346153846153,
          y: 640.7692307692307,
        },
        end: {
          x: 380.801282051282,
          y: 654.9358974358975,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 190528,
        start: {
          x: 368.301282051282,
          y: 659.1025641025642,
        },
        end: {
          x: 381.6346153846153,
          y: 674.1025641025642,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 172864,
        start: {
          x: 367.4679487179487,
          y: 676.6025641025642,
        },
        end: {
          x: 380.801282051282,
          y: 693.2692307692307,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 329024,
        start: {
          x: 368.07692307692304,
          y: 695.3846153846155,
        },
        end: {
          x: 379.6153846153846,
          y: 712.3076923076924,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 223488,
    name: "fn8",
    start: {
      x: 395.80128205128193,
      y: 508.2051282051283,
    },
    end: {
      x: 412.4679487179487,
      y: 716.5384615384617,
    },
    mode: "parent",
    type: "Form_no_parent",
    height: 208.33333333333326,
    width: 16.666666666666657,
    children: [
      {
        id: 594432,
        start: {
          x: 398.30128205128193,
          y: 511.53846153846155,
        },
        end: {
          x: 408.30128205128193,
          y: 534.0384615384617,
        },
        mode: "child1",
        type: "number",
        height: 22.500000000000057,
        width: 10,
        name: "a",
      },
      {
        id: 954112,
        start: {
          x: 398.30128205128193,
          y: 539.8717948717949,
        },
        end: {
          x: 409.9679487179487,
          y: 554.0384615384617,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666742,
        width: 11.666666666666657,
        name: "b",
      },
      {
        id: 560640,
        start: {
          x: 398.30128205128193,
          y: 556.5384615384617,
        },
        end: {
          x: 409.9679487179487,
          y: 571.5384615384617,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 11.666666666666657,
        name: "c",
      },
      {
        id: 510464,
        start: {
          x: 398.30128205128193,
          y: 573.2051282051284,
        },
        end: {
          x: 409.9679487179487,
          y: 584.8717948717949,
        },
        mode: "child",
        type: "option",
        height: 11.666666666666629,
        width: 11.666666666666657,
        name: "d",
      },
      {
        id: 267776,
        start: {
          x: 398.30128205128193,
          y: 588.2051282051284,
        },
        end: {
          x: 408.30128205128193,
          y: 604.8717948717949,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 10,
        name: "e",
      },
      {
        id: 755968,
        start: {
          x: 399.1346153846153,
          y: 608.2051282051284,
        },
        end: {
          x: 411.6346153846153,
          y: 624.8717948717949,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 12.5,
        name: "f",
      },
      {
        id: 304128,
        start: {
          x: 398.30128205128193,
          y: 626.5384615384617,
        },
        end: {
          x: 409.1346153846153,
          y: 639.8717948717949,
        },
        mode: "child",
        type: "option",
        height: 13.333333333333371,
        width: 10.833333333333343,
        name: "g",
      },
      {
        id: 222720,
        start: {
          x: 399.1346153846153,
          y: 641.5384615384617,
        },
        end: {
          x: 410.80128205128204,
          y: 655.7051282051282,
        },
        mode: "child",
        type: "option",
        height: 14.166666666666629,
        width: 11.666666666666657,
        name: "h",
      },
      {
        id: 184576,
        start: {
          x: 398.30128205128193,
          y: 659.8717948717949,
        },
        end: {
          x: 411.6346153846153,
          y: 674.8717948717949,
        },
        mode: "child",
        type: "option",
        height: 15,
        width: 13.333333333333343,
        name: "i",
      },
      {
        id: 156928,
        start: {
          x: 397.4679487179487,
          y: 677.3717948717949,
        },
        end: {
          x: 410.80128205128204,
          y: 694.0384615384617,
        },
        mode: "child",
        type: "option",
        height: 16.66666666666663,
        width: 13.333333333333314,
        name: "j",
      },
      {
        id: 791040,
        start: {
          x: 398.07692307692304,
          y: 696.1538461538462,
        },
        end: {
          x: 409.6153846153846,
          y: 713.0769230769231,
        },
        mode: "child",
        type: "option",
        height: 16.923076923076906,
        width: 11.538461538461547,
        name: "k",
      },
    ],
    isOpen: true,
  },

  {
    id: 663296,
    name: "htn1",
    start: {
      x: 160.45454545454544,
      y: 739.090909090909,
    },
    end: {
      x: 175,
      y: 948.1818181818181,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 363520,
        start: {
          x: 162.27272727272725,
          y: 740.9090909090909,
        },
        end: {
          x: 174.09090909090907,
          y: 764.5454545454545,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 650112,
        start: {
          x: 162.27272727272725,
          y: 765.4545454545454,
        },
        end: {
          x: 172.27272727272725,
          y: 781.8181818181818,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 771840,
        start: {
          x: 162.27272727272725,
          y: 781.8181818181818,
        },
        end: {
          x: 172.27272727272725,
          y: 798.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 920000,
        start: {
          x: 162.27272727272725,
          y: 801.8181818181818,
        },
        end: {
          x: 173.18181818181816,
          y: 817.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 960384,
        start: {
          x: 162.27272727272725,
          y: 819.9999999999999,
        },
        end: {
          x: 174.09090909090907,
          y: 838.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 769664,
        start: {
          x: 163.18181818181816,
          y: 839.090909090909,
        },
        end: {
          x: 173.18181818181816,
          y: 854.5454545454545,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 705856,
        start: {
          x: 161.36363636363635,
          y: 855.4545454545454,
        },
        end: {
          x: 172.27272727272725,
          y: 873.6363636363635,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 352640,
        start: {
          x: 163.18181818181816,
          y: 873.6363636363635,
        },
        end: {
          x: 173.18181818181816,
          y: 889.9999999999999,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 383168,
        start: {
          x: 161.36363636363635,
          y: 891.8181818181818,
        },
        end: {
          x: 172.27272727272725,
          y: 906.3636363636363,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 211328,
        start: {
          x: 162.27272727272725,
          y: 909.9999999999999,
        },
        end: {
          x: 173.18181818181816,
          y: 927.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 981568,
        start: {
          x: 161.36363636363635,
          y: 929.9999999999999,
        },
        end: {
          x: 174.09090909090907,
          y: 942.7272727272726,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 882432,
    name: "htn2",
    start: {
      x: 174.99999999999997,
      y: 739.090909090909,
    },
    end: {
      x: 189.54545454545453,
      y: 948.1818181818181,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 583168,
        start: {
          x: 176.81818181818178,
          y: 740.9090909090909,
        },
        end: {
          x: 188.6363636363636,
          y: 764.5454545454545,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 110336,
        start: {
          x: 176.81818181818178,
          y: 765.4545454545454,
        },
        end: {
          x: 186.81818181818178,
          y: 781.8181818181818,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 810240,
        start: {
          x: 176.81818181818178,
          y: 781.8181818181818,
        },
        end: {
          x: 186.81818181818178,
          y: 798.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 299520,
        start: {
          x: 176.81818181818178,
          y: 801.8181818181818,
        },
        end: {
          x: 187.7272727272727,
          y: 817.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 666880,
        start: {
          x: 176.81818181818178,
          y: 819.9999999999999,
        },
        end: {
          x: 188.6363636363636,
          y: 838.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 669184,
        start: {
          x: 177.7272727272727,
          y: 839.090909090909,
        },
        end: {
          x: 187.7272727272727,
          y: 854.5454545454545,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 250304,
        start: {
          x: 175.90909090909088,
          y: 855.4545454545454,
        },
        end: {
          x: 186.81818181818178,
          y: 873.6363636363635,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 104640,
        start: {
          x: 177.7272727272727,
          y: 873.6363636363635,
        },
        end: {
          x: 187.7272727272727,
          y: 889.9999999999999,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 330688,
        start: {
          x: 175.90909090909088,
          y: 891.8181818181818,
        },
        end: {
          x: 186.81818181818178,
          y: 906.3636363636363,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 501952,
        start: {
          x: 176.81818181818178,
          y: 909.9999999999999,
        },
        end: {
          x: 187.7272727272727,
          y: 927.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 100288,
        start: {
          x: 175.90909090909088,
          y: 929.9999999999999,
        },
        end: {
          x: 188.6363636363636,
          y: 942.7272727272726,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 533184,
    name: "htn3",
    start: {
      x: 190.45454545454544,
      y: 739.090909090909,
    },
    end: {
      x: 205,
      y: 948.1818181818181,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 728000,
        start: {
          x: 192.27272727272725,
          y: 740.9090909090909,
        },
        end: {
          x: 204.09090909090907,
          y: 764.5454545454545,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 933056,
        start: {
          x: 192.27272727272725,
          y: 765.4545454545454,
        },
        end: {
          x: 202.27272727272725,
          y: 781.8181818181818,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 261568,
        start: {
          x: 192.27272727272725,
          y: 781.8181818181818,
        },
        end: {
          x: 202.27272727272725,
          y: 798.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 501184,
        start: {
          x: 192.27272727272725,
          y: 801.8181818181818,
        },
        end: {
          x: 203.18181818181816,
          y: 817.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 837824,
        start: {
          x: 192.27272727272725,
          y: 819.9999999999999,
        },
        end: {
          x: 204.09090909090907,
          y: 838.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 117952,
        start: {
          x: 193.18181818181816,
          y: 839.090909090909,
        },
        end: {
          x: 203.18181818181816,
          y: 854.5454545454545,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 979136,
        start: {
          x: 191.36363636363635,
          y: 855.4545454545454,
        },
        end: {
          x: 202.27272727272725,
          y: 873.6363636363635,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 898496,
        start: {
          x: 193.18181818181816,
          y: 873.6363636363635,
        },
        end: {
          x: 203.18181818181816,
          y: 889.9999999999999,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 571840,
        start: {
          x: 191.36363636363635,
          y: 891.8181818181818,
        },
        end: {
          x: 202.27272727272725,
          y: 906.3636363636363,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 314304,
        start: {
          x: 192.27272727272725,
          y: 909.9999999999999,
        },
        end: {
          x: 203.18181818181816,
          y: 927.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 500416,
        start: {
          x: 191.36363636363635,
          y: 929.9999999999999,
        },
        end: {
          x: 204.09090909090907,
          y: 942.7272727272726,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 106432,
    name: "htn4",
    start: {
      x: 204.0909090909091,
      y: 739.0909090909091,
    },
    end: {
      x: 218.63636363636365,
      y: 948.1818181818182,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 912576,
        start: {
          x: 205.9090909090909,
          y: 740.909090909091,
        },
        end: {
          x: 217.72727272727272,
          y: 764.5454545454546,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 129216,
        start: {
          x: 205.9090909090909,
          y: 765.4545454545455,
        },
        end: {
          x: 215.9090909090909,
          y: 781.8181818181819,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 627136,
        start: {
          x: 205.9090909090909,
          y: 781.8181818181819,
        },
        end: {
          x: 215.9090909090909,
          y: 798.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 969664,
        start: {
          x: 205.9090909090909,
          y: 801.8181818181819,
        },
        end: {
          x: 216.8181818181818,
          y: 817.2727272727274,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 403136,
        start: {
          x: 205.9090909090909,
          y: 820,
        },
        end: {
          x: 217.72727272727272,
          y: 838.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 356288,
        start: {
          x: 206.8181818181818,
          y: 839.0909090909091,
        },
        end: {
          x: 216.8181818181818,
          y: 854.5454545454546,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 762304,
        start: {
          x: 205,
          y: 855.4545454545455,
        },
        end: {
          x: 215.9090909090909,
          y: 873.6363636363636,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 715712,
        start: {
          x: 206.8181818181818,
          y: 873.6363636363636,
        },
        end: {
          x: 216.8181818181818,
          y: 890,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 328640,
        start: {
          x: 205,
          y: 891.8181818181819,
        },
        end: {
          x: 215.9090909090909,
          y: 906.3636363636364,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 600000,
        start: {
          x: 205.9090909090909,
          y: 910,
        },
        end: {
          x: 216.8181818181818,
          y: 927.2727272727274,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 179392,
        start: {
          x: 205,
          y: 930,
        },
        end: {
          x: 217.72727272727272,
          y: 942.7272727272727,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: true,
  },
  {
    id: 420160,
    name: "htn5",
    start: {
      x: 219.54545454545453,
      y: 739.090909090909,
    },
    end: {
      x: 234.0909090909091,
      y: 948.1818181818181,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 206144,
        start: {
          x: 221.36363636363635,
          y: 740.9090909090909,
        },
        end: {
          x: 233.18181818181816,
          y: 764.5454545454545,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 419392,
        start: {
          x: 221.36363636363635,
          y: 765.4545454545454,
        },
        end: {
          x: 231.36363636363635,
          y: 781.8181818181818,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 176960,
        start: {
          x: 221.36363636363635,
          y: 781.8181818181818,
        },
        end: {
          x: 231.36363636363635,
          y: 798.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 521024,
        start: {
          x: 221.36363636363635,
          y: 801.8181818181818,
        },
        end: {
          x: 232.27272727272725,
          y: 817.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 901184,
        start: {
          x: 221.36363636363635,
          y: 819.9999999999999,
        },
        end: {
          x: 233.18181818181816,
          y: 838.1818181818181,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 356416,
        start: {
          x: 222.27272727272725,
          y: 839.090909090909,
        },
        end: {
          x: 232.27272727272725,
          y: 854.5454545454545,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 107584,
        start: {
          x: 220.45454545454544,
          y: 855.4545454545454,
        },
        end: {
          x: 231.36363636363635,
          y: 873.6363636363635,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 263232,
        start: {
          x: 222.27272727272725,
          y: 873.6363636363635,
        },
        end: {
          x: 232.27272727272725,
          y: 889.9999999999999,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 928320,
        start: {
          x: 220.45454545454544,
          y: 891.8181818181818,
        },
        end: {
          x: 231.36363636363635,
          y: 906.3636363636363,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 352576,
        start: {
          x: 221.36363636363635,
          y: 909.9999999999999,
        },
        end: {
          x: 232.27272727272725,
          y: 927.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 708160,
        start: {
          x: 220.45454545454544,
          y: 929.9999999999999,
        },
        end: {
          x: 233.18181818181816,
          y: 942.7272727272726,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 744448,
    name: "htn6",
    start: {
      x: 231.36363636363635,
      y: 739.9999999999998,
    },
    end: {
      x: 245.9090909090909,
      y: 949.0909090909089,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 515328,
        start: {
          x: 233.18181818181816,
          y: 741.8181818181816,
        },
        end: {
          x: 244.99999999999997,
          y: 765.4545454545453,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 157440,
        start: {
          x: 233.18181818181816,
          y: 766.3636363636361,
        },
        end: {
          x: 243.18181818181816,
          y: 782.7272727272725,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 225792,
        start: {
          x: 233.18181818181816,
          y: 782.7272727272725,
        },
        end: {
          x: 243.18181818181816,
          y: 799.0909090909089,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 448000,
        start: {
          x: 233.18181818181816,
          y: 802.7272727272725,
        },
        end: {
          x: 244.09090909090907,
          y: 818.181818181818,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 984064,
        start: {
          x: 233.18181818181816,
          y: 820.9090909090907,
        },
        end: {
          x: 244.99999999999997,
          y: 839.0909090909089,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 182528,
        start: {
          x: 234.09090909090907,
          y: 839.9999999999998,
        },
        end: {
          x: 244.09090909090907,
          y: 855.4545454545453,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 690176,
        start: {
          x: 232.27272727272725,
          y: 856.3636363636361,
        },
        end: {
          x: 243.18181818181816,
          y: 874.5454545454543,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 192000,
        start: {
          x: 234.09090909090907,
          y: 874.5454545454543,
        },
        end: {
          x: 244.09090909090907,
          y: 890.9090909090907,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 635904,
        start: {
          x: 232.27272727272725,
          y: 892.7272727272725,
        },
        end: {
          x: 243.18181818181816,
          y: 907.272727272727,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 482304,
        start: {
          x: 233.18181818181816,
          y: 910.9090909090907,
        },
        end: {
          x: 244.09090909090907,
          y: 928.181818181818,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 644096,
        start: {
          x: 232.27272727272725,
          y: 930.9090909090907,
        },
        end: {
          x: 244.99999999999997,
          y: 943.6363636363634,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 672768,
    name: "htn7",
    start: {
      x: 246.81818181818178,
      y: 740,
    },
    end: {
      x: 261.3636363636365,
      y: 949.0909090909091,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 487168,
        start: {
          x: 248.63636363636365,
          y: 741.8181818181819,
        },
        end: {
          x: 260.4545454545455,
          y: 765.4545454545455,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 392960,
        start: {
          x: 248.63636363636365,
          y: 766.3636363636364,
        },
        end: {
          x: 258.63636363636374,
          y: 782.7272727272727,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 554240,
        start: {
          x: 248.63636363636365,
          y: 782.7272727272727,
        },
        end: {
          x: 258.63636363636374,
          y: 799.0909090909091,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 720640,
        start: {
          x: 248.63636363636365,
          y: 802.7272727272727,
        },
        end: {
          x: 259.5454545454546,
          y: 818.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 766208,
        start: {
          x: 248.63636363636365,
          y: 820.9090909090909,
        },
        end: {
          x: 260.4545454545455,
          y: 839.0909090909091,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 826624,
        start: {
          x: 249.54545454545453,
          y: 840,
        },
        end: {
          x: 259.5454545454546,
          y: 855.4545454545455,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 182016,
        start: {
          x: 247.72727272727278,
          y: 856.3636363636364,
        },
        end: {
          x: 258.63636363636374,
          y: 874.5454545454545,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 764160,
        start: {
          x: 249.54545454545453,
          y: 874.5454545454545,
        },
        end: {
          x: 259.5454545454546,
          y: 890.9090909090909,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 744960,
        start: {
          x: 247.72727272727278,
          y: 892.7272727272727,
        },
        end: {
          x: 258.63636363636374,
          y: 907.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 605184,
        start: {
          x: 248.63636363636365,
          y: 910.9090909090909,
        },
        end: {
          x: 259.5454545454546,
          y: 928.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 426496,
        start: {
          x: 247.72727272727278,
          y: 930.9090909090909,
        },
        end: {
          x: 260.4545454545455,
          y: 943.6363636363636,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 976320,
    name: "htn8",
    start: {
      x: 261.3636363636362,
      y: 739.9999999999998,
    },
    end: {
      x: 275.9090909090906,
      y: 949.0909090909089,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 611264,
        start: {
          x: 263.18181818181796,
          y: 741.8181818181816,
        },
        end: {
          x: 274.9999999999997,
          y: 765.4545454545453,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 202688,
        start: {
          x: 263.18181818181796,
          y: 766.3636363636361,
        },
        end: {
          x: 273.18181818181785,
          y: 782.7272727272725,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 427712,
        start: {
          x: 263.18181818181796,
          y: 782.7272727272725,
        },
        end: {
          x: 273.18181818181785,
          y: 799.0909090909089,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 963008,
        start: {
          x: 263.18181818181796,
          y: 802.7272727272725,
        },
        end: {
          x: 274.0909090909087,
          y: 818.181818181818,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 795072,
        start: {
          x: 263.18181818181796,
          y: 820.9090909090907,
        },
        end: {
          x: 274.9999999999997,
          y: 839.0909090909089,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 480960,
        start: {
          x: 264.09090909090884,
          y: 839.9999999999998,
        },
        end: {
          x: 274.0909090909087,
          y: 855.4545454545453,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 788928,
        start: {
          x: 262.2727272727271,
          y: 856.3636363636361,
        },
        end: {
          x: 273.18181818181785,
          y: 874.5454545454543,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 493504,
        start: {
          x: 264.09090909090884,
          y: 874.5454545454543,
        },
        end: {
          x: 274.0909090909087,
          y: 890.9090909090907,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 911040,
        start: {
          x: 262.2727272727271,
          y: 892.7272727272725,
        },
        end: {
          x: 273.18181818181785,
          y: 907.272727272727,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 517312,
        start: {
          x: 263.18181818181796,
          y: 910.9090909090907,
        },
        end: {
          x: 274.0909090909087,
          y: 928.181818181818,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 941760,
        start: {
          x: 262.2727272727271,
          y: 930.9090909090907,
        },
        end: {
          x: 274.9999999999997,
          y: 943.6363636363634,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: true,
  },
  {
    id: 152576,
    name: "htn9",
    start: {
      x: 276.81818181818187,
      y: 740,
    },
    end: {
      x: 291.3636363636365,
      y: 949.0909090909091,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 772864,
        start: {
          x: 278.63636363636374,
          y: 741.8181818181819,
        },
        end: {
          x: 290.4545454545455,
          y: 765.4545454545455,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 524800,
        start: {
          x: 278.63636363636374,
          y: 766.3636363636364,
        },
        end: {
          x: 288.63636363636374,
          y: 782.7272727272727,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 337408,
        start: {
          x: 278.63636363636374,
          y: 782.7272727272727,
        },
        end: {
          x: 288.63636363636374,
          y: 799.0909090909091,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 401408,
        start: {
          x: 278.63636363636374,
          y: 802.7272727272727,
        },
        end: {
          x: 289.5454545454546,
          y: 818.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 121856,
        start: {
          x: 278.63636363636374,
          y: 820.9090909090909,
        },
        end: {
          x: 290.4545454545455,
          y: 839.0909090909091,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 619008,
        start: {
          x: 279.5454545454546,
          y: 840,
        },
        end: {
          x: 289.5454545454546,
          y: 855.4545454545455,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 102912,
        start: {
          x: 277.72727272727275,
          y: 856.3636363636364,
        },
        end: {
          x: 288.63636363636374,
          y: 874.5454545454545,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 527872,
        start: {
          x: 279.5454545454546,
          y: 874.5454545454545,
        },
        end: {
          x: 289.5454545454546,
          y: 890.9090909090909,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 275456,
        start: {
          x: 277.72727272727275,
          y: 892.7272727272727,
        },
        end: {
          x: 288.63636363636374,
          y: 907.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 105728,
        start: {
          x: 278.63636363636374,
          y: 910.9090909090909,
        },
        end: {
          x: 289.5454545454546,
          y: 928.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 106240,
        start: {
          x: 277.72727272727275,
          y: 930.9090909090909,
        },
        end: {
          x: 290.4545454545455,
          y: 943.6363636363636,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 934144,
    name: "htn10",
    start: {
      x: 290.45454545454544,
      y: 740,
    },
    end: {
      x: 304.99999999999994,
      y: 949.0909090909091,
    },
    mode: "parent",
    type: "hall_ticket_no_parent",

    height: 209.09090909090912,
    width: 14.545454545454561,
    children: [
      {
        id: 980992,
        start: {
          x: 292.2727272727272,
          y: 741.8181818181819,
        },
        end: {
          x: 304.09090909090907,
          y: 765.4545454545455,
        },
        mode: "child1",
        type: "number",
        height: 23.636363636363626,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 361216,
        start: {
          x: 292.2727272727272,
          y: 766.3636363636364,
        },
        end: {
          x: 302.2727272727272,
          y: 782.7272727272727,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "b",
      },
      {
        id: 148736,
        start: {
          x: 292.2727272727272,
          y: 782.7272727272727,
        },
        end: {
          x: 302.2727272727272,
          y: 799.0909090909091,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "c",
      },
      {
        id: 886784,
        start: {
          x: 292.2727272727272,
          y: 802.7272727272727,
        },
        end: {
          x: 303.1818181818181,
          y: 818.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10.909090909090907,
        name: "d",
      },
      {
        id: 973312,
        start: {
          x: 292.2727272727272,
          y: 820.9090909090909,
        },
        end: {
          x: 304.09090909090907,
          y: 839.0909090909091,
        },
        mode: "child",
        type: "option",

        height: 18.181818181818244,
        width: 11.818181818181813,
        name: "e",
      },
      {
        id: 847616,
        start: {
          x: 293.1818181818182,
          y: 840,
        },
        end: {
          x: 303.1818181818181,
          y: 855.4545454545455,
        },
        mode: "child",
        type: "option",

        height: 15.454545454545496,
        width: 10,
        name: "f",
      },
      {
        id: 379904,
        start: {
          x: 291.3636363636363,
          y: 856.3636363636364,
        },
        end: {
          x: 302.2727272727272,
          y: 874.5454545454545,
        },
        mode: "child",
        type: "option",

        height: 18.18181818181813,
        width: 10.909090909090907,
        name: "g",
      },
      {
        id: 340480,
        start: {
          x: 293.1818181818182,
          y: 874.5454545454545,
        },
        end: {
          x: 303.1818181818181,
          y: 890.9090909090909,
        },
        mode: "child",
        type: "option",

        height: 16.363636363636374,
        width: 10,
        name: "h",
      },
      {
        id: 664576,
        start: {
          x: 291.3636363636363,
          y: 892.7272727272727,
        },
        end: {
          x: 302.2727272727272,
          y: 907.2727272727273,
        },
        mode: "child",
        type: "option",

        height: 14.545454545454504,
        width: 10.909090909090907,
        name: "i",
      },
      {
        id: 571648,
        start: {
          x: 292.2727272727272,
          y: 910.9090909090909,
        },
        end: {
          x: 303.1818181818181,
          y: 928.1818181818182,
        },
        mode: "child",
        type: "option",

        height: 17.272727272727366,
        width: 10.909090909090907,
        name: "j",
      },
      {
        id: 878848,
        start: {
          x: 291.3636363636363,
          y: 930.9090909090909,
        },
        end: {
          x: 304.09090909090907,
          y: 943.6363636363636,
        },
        mode: "child",
        type: "option",

        height: 12.727272727272748,
        width: 12.72727272727272,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 630656,
    name: "",
    start: {
      x: 335,
      y: 740.9090909090909,
    },
    end: {
      x: 351.3636363636363,
      y: 949.090909090909,
    },
    mode: "parent",
    type: "test_booklet_parent",
    height: 208.18181818181813,
    width: 16.363636363636317,
    children: [
      {
        id: 188032,
        start: {
          x: 336.8181818181818,
          y: 742.7272727272726,
        },
        end: {
          x: 348.6363636363636,
          y: 765.4545454545454,
        },
        mode: "child1",
        type: "number",
        height: 22.727272727272748,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 107584,
        start: {
          x: 337.7272727272727,
          y: 766.3636363636363,
        },
        end: {
          x: 347.7272727272727,
          y: 781.8181818181818,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 10,
        name: "b",
      },
      {
        id: 347200,
        start: {
          x: 336.8181818181818,
          y: 785.4545454545454,
        },
        end: {
          x: 350.45454545454544,
          y: 802.7272727272726,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 13.636363636363626,
        name: "c",
      },
      {
        id: 197312,
        start: {
          x: 337.7272727272727,
          y: 802.7272727272726,
        },
        end: {
          x: 349.5454545454545,
          y: 819.090909090909,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 11.818181818181813,
        name: "d",
      },
      {
        id: 696384,
        start: {
          x: 337.7272727272727,
          y: 820.9090909090909,
        },
        end: {
          x: 350.45454545454544,
          y: 838.1818181818181,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 12.727272727272748,
        name: "e",
      },
      {
        id: 594624,
        start: {
          x: 335.9090909090909,
          y: 839.090909090909,
        },
        end: {
          x: 349.5454545454545,
          y: 852.7272727272726,
        },
        mode: "child",
        type: "option",
        height: 13.636363636363626,
        width: 13.636363636363626,
        name: "f",
      },
      {
        id: 534656,
        start: {
          x: 335.9090909090909,
          y: 853.6363636363635,
        },
        end: {
          x: 350.45454545454544,
          y: 870.9090909090909,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727366,
        width: 14.545454545454561,
        name: "g",
      },
      {
        id: 641472,
        start: {
          x: 337.7272727272727,
          y: 869.9999999999999,
        },
        end: {
          x: 350.45454545454544,
          y: 886.3636363636363,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 12.727272727272748,
        name: "h",
      },
      {
        id: 893888,
        start: {
          x: 337.7272727272727,
          y: 890.9090909090909,
        },
        end: {
          x: 349.5454545454545,
          y: 908.1818181818181,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 11.818181818181813,
        name: "i",
      },
      {
        id: 956224,
        start: {
          x: 335.9090909090909,
          y: 911.8181818181818,
        },
        end: {
          x: 350.45454545454544,
          y: 928.1818181818181,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 14.545454545454561,
        name: "j",
      },
      {
        id: 728320,
        start: {
          x: 336.8181818181818,
          y: 929.090909090909,
        },
        end: {
          x: 348.6363636363636,
          y: 944.5454545454545,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 11.818181818181813,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 707904,
    name: "",
    start: {
      x: 350.4545454545454,
      y: 740.9090909090909,
    },
    end: {
      x: 366.8181818181817,
      y: 949.090909090909,
    },
    mode: "parent",
    type: "test_booklet_parent",
    height: 208.18181818181813,
    width: 16.363636363636317,
    children: [
      {
        id: 479040,
        start: {
          x: 352.2727272727272,
          y: 742.7272727272726,
        },
        end: {
          x: 364.090909090909,
          y: 765.4545454545454,
        },
        mode: "child1",
        type: "number",
        height: 22.727272727272748,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 272960,
        start: {
          x: 353.1818181818181,
          y: 766.3636363636363,
        },
        end: {
          x: 363.1818181818181,
          y: 781.8181818181818,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 10,
        name: "b",
      },
      {
        id: 875584,
        start: {
          x: 352.2727272727272,
          y: 785.4545454545454,
        },
        end: {
          x: 365.9090909090908,
          y: 802.7272727272726,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 13.636363636363626,
        name: "c",
      },
      {
        id: 642368,
        start: {
          x: 353.1818181818181,
          y: 802.7272727272726,
        },
        end: {
          x: 364.9999999999999,
          y: 819.090909090909,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 11.818181818181813,
        name: "d",
      },
      {
        id: 720448,
        start: {
          x: 353.1818181818181,
          y: 820.9090909090909,
        },
        end: {
          x: 365.9090909090908,
          y: 838.1818181818181,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 12.727272727272748,
        name: "e",
      },
      {
        id: 868672,
        start: {
          x: 351.36363636363626,
          y: 839.090909090909,
        },
        end: {
          x: 364.9999999999999,
          y: 852.7272727272726,
        },
        mode: "child",
        type: "option",
        height: 13.636363636363626,
        width: 13.636363636363626,
        name: "f",
      },
      {
        id: 162368,
        start: {
          x: 351.36363636363626,
          y: 853.6363636363635,
        },
        end: {
          x: 365.9090909090908,
          y: 870.9090909090909,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727366,
        width: 14.545454545454561,
        name: "g",
      },
      {
        id: 162624,
        start: {
          x: 353.1818181818181,
          y: 869.9999999999999,
        },
        end: {
          x: 365.9090909090908,
          y: 886.3636363636363,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 12.727272727272748,
        name: "h",
      },
      {
        id: 216640,
        start: {
          x: 353.1818181818181,
          y: 890.9090909090909,
        },
        end: {
          x: 364.9999999999999,
          y: 908.1818181818181,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 11.818181818181813,
        name: "i",
      },
      {
        id: 279104,
        start: {
          x: 351.36363636363626,
          y: 911.8181818181818,
        },
        end: {
          x: 365.9090909090908,
          y: 928.1818181818181,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 14.545454545454561,
        name: "j",
      },
      {
        id: 387904,
        start: {
          x: 352.2727272727272,
          y: 929.090909090909,
        },
        end: {
          x: 364.090909090909,
          y: 944.5454545454545,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 11.818181818181813,
        name: "k",
      },
    ],
    isOpen: false,
  },
  {
    id: 501632,
    name: "",
    start: {
      x: 364.09090909090907,
      y: 740.909090909091,
    },
    end: {
      x: 380.4545454545454,
      y: 949.0909090909091,
    },
    mode: "parent",
    type: "test_booklet_parent",
    height: 208.18181818181813,
    width: 16.363636363636317,
    children: [
      {
        id: 851584,
        start: {
          x: 365.9090909090909,
          y: 742.7272727272727,
        },
        end: {
          x: 377.7272727272727,
          y: 765.4545454545455,
        },
        mode: "child1",
        type: "number",
        height: 22.727272727272748,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 737152,
        start: {
          x: 366.81818181818176,
          y: 766.3636363636364,
        },
        end: {
          x: 376.81818181818176,
          y: 781.8181818181819,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 10,
        name: "b",
      },
      {
        id: 248704,
        start: {
          x: 365.9090909090909,
          y: 785.4545454545455,
        },
        end: {
          x: 379.5454545454545,
          y: 802.7272727272727,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 13.636363636363626,
        name: "c",
      },
      {
        id: 693376,
        start: {
          x: 366.81818181818176,
          y: 802.7272727272727,
        },
        end: {
          x: 378.63636363636357,
          y: 819.0909090909091,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 11.818181818181813,
        name: "d",
      },
      {
        id: 897664,
        start: {
          x: 366.81818181818176,
          y: 820.909090909091,
        },
        end: {
          x: 379.5454545454545,
          y: 838.1818181818182,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 12.727272727272748,
        name: "e",
      },
      {
        id: 243072,
        start: {
          x: 364.99999999999994,
          y: 839.0909090909091,
        },
        end: {
          x: 378.63636363636357,
          y: 852.7272727272727,
        },
        mode: "child",
        type: "option",
        height: 13.636363636363626,
        width: 13.636363636363626,
        name: "f",
      },
      {
        id: 263552,
        start: {
          x: 364.99999999999994,
          y: 853.6363636363636,
        },
        end: {
          x: 379.5454545454545,
          y: 870.909090909091,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727366,
        width: 14.545454545454561,
        name: "g",
      },
      {
        id: 178304,
        start: {
          x: 366.81818181818176,
          y: 870,
        },
        end: {
          x: 379.5454545454545,
          y: 886.3636363636364,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 12.727272727272748,
        name: "h",
      },
      {
        id: 354688,
        start: {
          x: 366.81818181818176,
          y: 890.909090909091,
        },
        end: {
          x: 378.63636363636357,
          y: 908.1818181818182,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 11.818181818181813,
        name: "i",
      },
      {
        id: 758144,
        start: {
          x: 364.99999999999994,
          y: 911.8181818181819,
        },
        end: {
          x: 379.5454545454545,
          y: 928.1818181818182,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 14.545454545454561,
        name: "j",
      },
      {
        id: 846464,
        start: {
          x: 365.9090909090909,
          y: 929.0909090909091,
        },
        end: {
          x: 377.7272727272727,
          y: 944.5454545454546,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 11.818181818181813,
        name: "k",
      },
    ],
    isOpen: true,
  },
  {
    id: 523456,
    name: "",
    start: {
      x: 380.45454545454544,
      y: 740.9090909090908,
    },
    end: {
      x: 396.81818181818176,
      y: 949.0909090909089,
    },
    mode: "parent",
    type: "test_booklet_parent",
    height: 208.18181818181813,
    width: 16.363636363636317,
    children: [
      {
        id: 292544,
        start: {
          x: 382.27272727272725,
          y: 742.7272727272725,
        },
        end: {
          x: 394.09090909090907,
          y: 765.4545454545453,
        },
        mode: "child1",
        type: "number",
        height: 22.727272727272748,
        width: 11.818181818181813,
        name: "a",
      },
      {
        id: 387520,
        start: {
          x: 383.18181818181813,
          y: 766.3636363636361,
        },
        end: {
          x: 393.18181818181813,
          y: 781.8181818181816,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 10,
        name: "b",
      },
      {
        id: 228544,
        start: {
          x: 382.27272727272725,
          y: 785.4545454545453,
        },
        end: {
          x: 395.9090909090909,
          y: 802.7272727272725,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 13.636363636363626,
        name: "c",
      },
      {
        id: 835008,
        start: {
          x: 383.18181818181813,
          y: 802.7272727272725,
        },
        end: {
          x: 394.99999999999994,
          y: 819.0909090909089,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 11.818181818181813,
        name: "d",
      },
      {
        id: 925120,
        start: {
          x: 383.18181818181813,
          y: 820.9090909090908,
        },
        end: {
          x: 395.9090909090909,
          y: 838.181818181818,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 12.727272727272748,
        name: "e",
      },
      {
        id: 733888,
        start: {
          x: 381.3636363636363,
          y: 839.0909090909089,
        },
        end: {
          x: 394.99999999999994,
          y: 852.7272727272725,
        },
        mode: "child",
        type: "option",
        height: 13.636363636363626,
        width: 13.636363636363626,
        name: "f",
      },
      {
        id: 696256,
        start: {
          x: 381.3636363636363,
          y: 853.6363636363634,
        },
        end: {
          x: 395.9090909090909,
          y: 870.9090909090908,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727366,
        width: 14.545454545454561,
        name: "g",
      },
      {
        id: 580288,
        start: {
          x: 383.18181818181813,
          y: 869.9999999999998,
        },
        end: {
          x: 395.9090909090909,
          y: 886.3636363636361,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 12.727272727272748,
        name: "h",
      },
      {
        id: 689088,
        start: {
          x: 383.18181818181813,
          y: 890.9090909090908,
        },
        end: {
          x: 394.99999999999994,
          y: 908.181818181818,
        },
        mode: "child",
        type: "option",
        height: 17.272727272727252,
        width: 11.818181818181813,
        name: "i",
      },
      {
        id: 166336,
        start: {
          x: 381.3636363636363,
          y: 911.8181818181816,
        },
        end: {
          x: 395.9090909090909,
          y: 928.181818181818,
        },
        mode: "child",
        type: "option",
        height: 16.363636363636374,
        width: 14.545454545454561,
        name: "j",
      },
      {
        id: 623808,
        start: {
          x: 382.27272727272725,
          y: 929.0909090909089,
        },
        end: {
          x: 394.09090909090907,
          y: 944.5454545454544,
        },
        mode: "child",
        type: "option",
        height: 15.454545454545496,
        width: 11.818181818181813,
        name: "k",
      },
    ],
    isOpen: false,
  },
];
const result = type_config(items);
console.log(result);
