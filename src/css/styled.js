import { createGlobalStyle } from "styled-components";
import { useStore } from "../contexts/Store";
export default createGlobalStyle`
.e-radio + label .e-label, .e-dlg-header *,.e-float-input.e-control-wrapper:not(.e-error) textarea:valid ~ label.e-float-text, .e-float-input.e-control-wrapper:not(.e-error) textarea ~ label.e-label-top.e-float-text,.e-float-input.e-control-wrapper:not(.e-error) input:valid ~ label.e-float-text, .e-float-input.e-control-wrapper:not(.e-error) input ~ label.e-label-top.e-float-text{
   color:${useStore.getState().theme.name === "dark" && "#a9aaab"}  !important;
}
.e-input-group input.e-input::placeholder,
.e-input-group textarea.e-input::placeholder{
  background-color: ${useStore.getState().theme.name === "dark" && "#40444B"} !important;
  color:${useStore.getState().theme.name === "dark" && "#a9aaab"}  !important;
}
.e-input-group, .e-input-group.e-control-wrapper, .e-float-input, .e-float-input.e-input-group, .e-float-input.e-control-wrapper, .e-float-input.e-input-group.e-control-wrapper {
  color:${useStore.getState().theme.name === "dark" && "#dcddde"}  !important;
}
.e-input-group:not(.e-success):not(.e-warning):not(.e-error):not(.e-float-icon-left).e-disabled
 {
 background-color: ${useStore.getState().theme.name === "dark" && "#40444B"} !important;
    color:${useStore.getState().theme.name === "dark" && "#dcddde"}  !important;
}
.e-dropdownbase .e-list-item {
background: ${useStore.getState().theme.name === "dark" && "#565B65"} !important;
color:${useStore.getState().theme.name === "dark" && "#dcddde"}  !important;
} 
.e-schedule, .e-schedule .e-schedule-toolbar .e-toolbar-items , .e-schedule .e-schedule-table tbody tr td{
background: ${useStore.getState().theme.name === "dark" && "#2f3136"} !important;
color:${useStore.getState().theme.name === "dark" && "#dcddde"}  !important;
} 
  .e-schedule .e-vertical-view.e-day-view .e-work-cells,
  .e-schedule .e-vertical-view.e-day-view .e-date-header-wrap table col,
  .e-schedule .e-vertical-view.e-day-view .e-content-wrap table col {
    width: 300px;
  }
  .e-schedule .e-vertical-view.e-week-view .e-work-cells,
  .e-schedule .e-vertical-view.e-week-view .e-date-header-wrap table col,
  .e-schedule .e-vertical-view.e-week-view .e-content-wrap table col {
    width: 300px;
  }
  .e-schedule .e-vertical-view .e-header-cells {
    height: 40px;
  }
  .e-schedule .e-vertical-view .e-date-header-wrap table tbody td {
    text-align: center;
  }
  .e-schedule .e-vertical-view .e-resource-cells {
    height: 30px;
    padding: 0;
  }
.e-toolbar .e-toolbar-items, .e-toolbar .e-tbar-btn, .e-grid .e-pager, .e-pager .e-pagercontainer {
  background-color: ${useStore.getState().theme.name === "dark" && "#202225"} !important;
  color:${useStore.getState().theme.name === "dark" && "#eee"} ;
}
.e-listbox-wrapper .e-list-group-item,.e-fixed-head, .e-listbox-container .e-list-group-item,.e-dropdownbase .e-list-group-item{
    background-color: ${useStore.getState().theme.name === "dark" && "#1e293b"} !important;
  color:${useStore.getState().theme.name === "dark" && "#eee"} ;
}
.e-listbox-wrapper .e-list-item, .e-listbox-container .e-list-item {
   background-color: ${useStore.getState().theme.name === "dark" && "#40444B"} !important;
    color:${useStore.getState().theme.name === "dark" && "#dcddde"}  !important;
}
.e-multi-select-wrapper input[type=text] {
  background: ${useStore.getState().theme.name === "dark" && "#40444B"} !important;
}
.e-multi-select-wrapper .e-chips {
background-color: ${useStore.getState().theme.name === "dark" && "#565B65"} !important;

}
.e-multi-select-wrapper .e-chips > .e-chipcontent, .e-multi-select-wrapper .e-delim-values {
-webkit-text-fill-color:${useStore.getState().theme.name === "dark" && "#eee"} !important;
}
.e-checkbox-wrapper .e-frame, .e-dropdownbase {
  background-color: ${useStore.getState().theme.name === "dark" && "#2f3136"} !important;
}
.e-ddl.e-input-group.e-control-wrapper .e-input,
.e-input-group:not(.e-success):not(.e-warning):not(.e-error):not(.e-float-icon-left) , .e-pager div.e-icons.e-disable{
 background-color: ${useStore.getState().theme.name === "dark" && "#40444B"} !important;
    color:${useStore.getState().theme.name === "dark" && "#fff"}  !important;
}
.e-toolbar .e-toolbar-items .e-toolbar-item.e-overlay, .e-appointment,.e-toolbar .e-tbar-btn{
   background-color: ${useStore.getState().theme.name === "dark" && "transparent"} !important;
}
.e-treeview .e-list-item div.e-icons::before{
  color:${useStore.getState().theme.name === "dark" && "#dcddde"}  !important;
}
  .e-dlg-content {
    background-color: ${useStore.getState().theme.name === "dark" && "#2f3136"};
    color:${useStore.getState().theme.name === "dark" && "#eee"} ;
    border:${useStore.getState().theme.name === "dark" && "none"} !important;
  }
  .e-dialog {
    background-color: ${useStore.getState().theme.name === "dark" && "#2f3136"};
     color:${useStore.getState().theme.name === "dark" && "#eee"} ;
     border:${useStore.getState().theme.name === "dark" && "none"} !important;
  }
  .e-tab .e-tab-header .e-toolbar-item .e-close-icon{
    color:${useStore.getState().theme.name === "dark" && "#eee"} !important;
  }
  .e-tab .e-tab-header .e-toolbar-items, .e-tab .e-tab-header .e-toolbar-item .e-tab-wrap {
        background-color: ${useStore.getState().theme.name === "dark" && "#202225"}!important;
     color:${useStore.getState().theme.name === "dark" && "#eee"} !important;
     //border:${useStore.getState().theme.name === "dark" && "none"} !important;
  }

  .e-dialog .e-dlg-header-content{
background-color: ${useStore.getState().theme.name === "dark" && "#1e293b"};
border:${useStore.getState().theme.name === "dark" && "none"} !important;
  }
  .e-dialog .e-dlg-header-content .e-btn.e-dlg-closeicon-btn{
    background-color:${useStore.getState().theme.name === "dark" && "#dcddde"} ;

  }
    .e-dialog .e-dlg-header{
 color:${useStore.getState().theme.name === "dark" && "#fff"};
 border:${useStore.getState().theme.name === "dark" && "none"} !important;
  }
    .e-dialog .e-btn.e-flat {
 color:${useStore.getState().theme.name === "dark" && "#fff"};

  }
  .e-dialog .e-footer-content {
background-color: ${useStore.getState().theme.name === "dark" && "#1e293b"};
border:${useStore.getState().theme.name === "dark" && "none"} !important;
  }
  .e-checkbox-wrapper .e-label, .e-css.e-checkbox-wrapper .e-label{
    color:${useStore.getState().theme.name === "dark" && "#fff"} !important;
  }
   .e-grid {
    background-color: ${useStore.getState().theme.name === "dark" && "#202225"};
    color: white;
    border: none;
  }

  .e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-btn:hover {
  background-color: ${useStore.getState().theme.name === "dark" ? "#40444B" : "rgb(213, 230, 244)"} !important;
  border-radius: 5px;
 }
.e-grid td.e-active {
   background-color: ${useStore.getState().theme.name === "dark" ? "#1e293b" : " rgb(213, 230, 244)"} !important;
}
.e-toolbar .e-tbar-btn:focus {
  background-color: "rgb(213, 230, 244)" !important;
  border-radius: 5px;
}
.e-grid .e-toolbar{
  border-top:0;
}
.e-grid .e-gridheader tr th{
  background-color:#f8fafc;
}
.e-list-parent .e-list-item.e-selected {
  background-color: "rgb(203, 206, 211) "!important;
}


  .e-toolbar .e-toolbar-items,
  .e-toolbar .e-tbar-btn {
   background-color: ${useStore.getState().theme.name === "dark" && "#202225"};
  }
  .e-grid .e-content {
    background-color: ${useStore.getState().theme.name === "dark" && "#202225"};
  }
  .e-grid .e-table tr td {
    background-color: ${useStore.getState().theme.name === "dark" && "#2f3136"};
    color: ${useStore.getState().theme.name === "dark" && "white"} !important;
  }
  .e-grid .e-gridheader,
  .e-grid .e-gridheader tr th {
    background-color: ${useStore.getState().theme.name === "dark" && "#202225"};
    border-bottom-color: ${useStore.getState().theme.name === "dark" && "#a5acb7"};
    border-top-color: ${useStore.getState().theme.name === "dark" && "#a5acb7"};
    color: ${useStore.getState().theme.name === "dark" && "#d9dadb"};
  }
  .e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn-text,
  .e-toolbar .e-toolbar-item .e-tbar-btn.e-btn .e-icons.e-btn-icon {
    color: ${useStore.getState().theme.name === "dark" && "white"};
  }
`;
