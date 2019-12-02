




export const vacForm = [
{ "list": [
    {
      "type": "text",
      "icon": "icon-wenzishezhi-",
      "options": {
        "defaultValue": "事假申请表",
        "customClass": "",
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "remoteFunc": "func_1573903806397"
      },
      "name": "表名",
      "key": "1573903806397",
      "model": "text_1573903806397",
      "rules": []
    },
    {
      "type": "grid",
      "icon": "icon-RectangleCopy",
      "columns": [
        {
          "span": 12,
          "list": [
            {
              "type": "input",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "customClass": "",
                "disabled": false,
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "showPassword": false,
                "remoteFunc": "func_1573904158938"
              },
              "name": "申请人",
              "novalid": {},
              "key": "1573904158938",
              "model": "input_1573904158938",
              "rules": [
                {
                  "type": "string",
                  "message": "申请人格式不正确"
                }
              ]
            }
          ]
        },
        {
          "span": 12,
          "list": []
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "customClass": "",
        "hidden": false,
        "remoteFunc": "func_1573904139090"
      },
      "name": "栅格布局",
      "key": "1573904139090",
      "model": "grid_1573904139090",
      "rules": []
    },
    {
      "type": "grid",
      "icon": "icon-RectangleCopy",
      "columns": [
        {
          "span": 12,
          "list": [
            {
              "type": "date",
              "icon": "icon-date",
              "options": {
                "defaultValue": "",
                "readonly": false,
                "disabled": false,
                "editable": true,
                "clearable": true,
                "placeholder": "",
                "startPlaceholder": "",
                "endPlaceholder": "",
                "type": "date",
                "format": "yyyy-MM-dd",
                "timestamp": false,
                "required": false,
                "width": "100%",
                "customClass": "",
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "remoteFunc": "func_1573904227659"
              },
              "name": "开始时间",
              "novalid": {},
              "key": "1573904227659",
              "model": "date_1573904227659",
              "rules": []
            }
          ]
        },
        {
          "span": 12,
          "list": [
            {
              "type": "date",
              "icon": "icon-date",
              "options": {
                "defaultValue": "",
                "readonly": false,
                "disabled": false,
                "editable": true,
                "clearable": true,
                "placeholder": "",
                "startPlaceholder": "",
                "endPlaceholder": "",
                "type": "date",
                "format": "yyyy-MM-dd",
                "timestamp": false,
                "required": false,
                "width": "100%",
                "customClass": "",
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "remoteFunc": "func_1573904229831"
              },
              "name": "结束时间",
              "novalid": {},
              "key": "1573904229831",
              "model": "date_1573904229831",
              "rules": []
            }
          ]
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "customClass": "",
        "hidden": false,
        "remoteFunc": "func_1573904167600"
      },
      "name": "栅格布局",
      "key": "1573904167600",
      "model": "grid_1573904167600",
      "rules": []
    },
    {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "disabled": false,
        "pattern": "",
        "placeholder": "",
        "customClass": "",
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "remoteFunc": "func_1573903887385"
      },
      "name": "申请原因",
      "key": "1573903887385",
      "model": "textarea_1573903887385",
      "rules": []
    },
    {
      "type": "input",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "customClass": "",
        "disabled": false,
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "showPassword": false,
        "remoteFunc": "func_1574924441637"
      },
      "name": "备注",
      "key": "1574924441637",
      "model": "input_1574924441637",
      "rules": [
        {
          "type": "string",
          "message": "备注格式不正确"
        }
      ]
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "right",
    "size": "small",
    "customClass": ""
  }
},
{ "list": [
    {
      "type": "text",
      "icon": "icon-wenzishezhi-",
      "options": {
        "defaultValue": "病假申请表",
        "customClass": "",
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "remoteFunc": "func_1573903806397"
      },
      "name": "表名",
      "key": "1573903806397",
      "model": "text_1573903806397",
      "rules": []
    },
    {
      "type": "grid",
      "icon": "icon-RectangleCopy",
      "columns": [
        {
          "span": 12,
          "list": [
            {
              "type": "input",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "customClass": "",
                "disabled": false,
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "showPassword": false,
                "remoteFunc": "func_1573904158938"
              },
              "name": "申请人",
              "novalid": {},
              "key": "1573904158938",
              "model": "input_1573904158938",
              "rules": [
                {
                  "type": "string",
                  "message": "申请人格式不正确"
                }
              ]
            }
          ]
        },
        {
          "span": 12,
          "list": []
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "customClass": "",
        "hidden": false,
        "remoteFunc": "func_1573904139090"
      },
      "name": "栅格布局",
      "key": "1573904139090",
      "model": "grid_1573904139090",
      "rules": []
    },
    {
      "type": "grid",
      "icon": "icon-RectangleCopy",
      "columns": [
        {
          "span": 12,
          "list": [
            {
              "type": "date",
              "icon": "icon-date",
              "options": {
                "defaultValue": "",
                "readonly": false,
                "disabled": false,
                "editable": true,
                "clearable": true,
                "placeholder": "",
                "startPlaceholder": "",
                "endPlaceholder": "",
                "type": "date",
                "format": "yyyy-MM-dd",
                "timestamp": false,
                "required": false,
                "width": "100%",
                "customClass": "",
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "remoteFunc": "func_1573904227659"
              },
              "name": "开始时间",
              "novalid": {},
              "key": "1573904227659",
              "model": "date_1573904227659",
              "rules": []
            }
          ]
        },
        {
          "span": 12,
          "list": [
            {
              "type": "date",
              "icon": "icon-date",
              "options": {
                "defaultValue": "",
                "readonly": false,
                "disabled": false,
                "editable": true,
                "clearable": true,
                "placeholder": "",
                "startPlaceholder": "",
                "endPlaceholder": "",
                "type": "date",
                "format": "yyyy-MM-dd",
                "timestamp": false,
                "required": false,
                "width": "100%",
                "customClass": "",
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "remoteFunc": "func_1573904229831"
              },
              "name": "结束时间",
              "novalid": {},
              "key": "1573904229831",
              "model": "date_1573904229831",
              "rules": []
            }
          ]
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "customClass": "",
        "hidden": false,
        "remoteFunc": "func_1573904167600"
      },
      "name": "栅格布局",
      "key": "1573904167600",
      "model": "grid_1573904167600",
      "rules": []
    },
    {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "disabled": false,
        "pattern": "",
        "placeholder": "",
        "customClass": "",
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "remoteFunc": "func_1573903887385"
      },
      "name": "申请原因",
      "key": "1573903887385",
      "model": "textarea_1573903887385",
      "rules": []
    },
    {
      "type": "input",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "customClass": "",
        "disabled": false,
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "showPassword": false,
        "remoteFunc": "func_1574924441637"
      },
      "name": "备注",
      "key": "1574924441637",
      "model": "input_1574924441637",
      "rules": [
        {
          "type": "string",
          "message": "备注格式不正确"
        }
      ]
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "right",
    "size": "small",
    "customClass": ""
  }
},
{ "list": [
    {
      "type": "text",
      "icon": "icon-wenzishezhi-",
      "options": {
        "defaultValue": "带薪假申请表",
        "customClass": "",
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "remoteFunc": "func_1573903806397"
      },
      "name": "表名",
      "key": "1573903806397",
      "model": "text_1573903806397",
      "rules": []
    },
    {
      "type": "grid",
      "icon": "icon-RectangleCopy",
      "columns": [
        {
          "span": 12,
          "list": [
            {
              "type": "input",
              "icon": "icon-input",
              "options": {
                "width": "100%",
                "defaultValue": "",
                "required": false,
                "dataType": "string",
                "pattern": "",
                "placeholder": "",
                "customClass": "",
                "disabled": false,
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "showPassword": false,
                "remoteFunc": "func_1573904158938"
              },
              "name": "申请人",
              "novalid": {},
              "key": "1573904158938",
              "model": "input_1573904158938",
              "rules": [
                {
                  "type": "string",
                  "message": "申请人格式不正确"
                }
              ]
            }
          ]
        },
        {
          "span": 12,
          "list": []
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "customClass": "",
        "hidden": false,
        "remoteFunc": "func_1573904139090"
      },
      "name": "栅格布局",
      "key": "1573904139090",
      "model": "grid_1573904139090",
      "rules": []
    },
    {
      "type": "grid",
      "icon": "icon-RectangleCopy",
      "columns": [
        {
          "span": 12,
          "list": [
            {
              "type": "date",
              "icon": "icon-date",
              "options": {
                "defaultValue": "",
                "readonly": false,
                "disabled": false,
                "editable": true,
                "clearable": true,
                "placeholder": "",
                "startPlaceholder": "",
                "endPlaceholder": "",
                "type": "date",
                "format": "yyyy-MM-dd",
                "timestamp": false,
                "required": false,
                "width": "100%",
                "customClass": "",
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "remoteFunc": "func_1573904227659"
              },
              "name": "开始时间",
              "novalid": {},
              "key": "1573904227659",
              "model": "date_1573904227659",
              "rules": []
            }
          ]
        },
        {
          "span": 12,
          "list": [
            {
              "type": "date",
              "icon": "icon-date",
              "options": {
                "defaultValue": "",
                "readonly": false,
                "disabled": false,
                "editable": true,
                "clearable": true,
                "placeholder": "",
                "startPlaceholder": "",
                "endPlaceholder": "",
                "type": "date",
                "format": "yyyy-MM-dd",
                "timestamp": false,
                "required": false,
                "width": "100%",
                "customClass": "",
                "labelWidth": 100,
                "isLabelWidth": false,
                "hidden": false,
                "dataBind": true,
                "remoteFunc": "func_1573904229831"
              },
              "name": "结束时间",
              "novalid": {},
              "key": "1573904229831",
              "model": "date_1573904229831",
              "rules": []
            }
          ]
        }
      ],
      "options": {
        "gutter": 0,
        "justify": "start",
        "align": "top",
        "customClass": "",
        "hidden": false,
        "remoteFunc": "func_1573904167600"
      },
      "name": "栅格布局",
      "key": "1573904167600",
      "model": "grid_1573904167600",
      "rules": []
    },
    {
      "type": "textarea",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "disabled": false,
        "pattern": "",
        "placeholder": "",
        "customClass": "",
        "labelWidth": 100,
        "isLabelWidth": false,
        "hidden": false,
        "dataBind": true,
        "remoteFunc": "func_1573903887385"
      },
      "name": "申请原因",
      "key": "1573903887385",
      "model": "textarea_1573903887385",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "right",
    "size": "small",
    "customClass": ""
  }
}]
