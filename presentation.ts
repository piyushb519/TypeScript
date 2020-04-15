import { CRUD } from "./businessLogic.js";
import { operations } from "./businessLogic.js";
import { Role } from "./businessLogic.js";
import { Employee } from "./businessLogic.js";
import { ButtonOperations } from "./buttonoperations.js";
class Presentation implements CRUD<Employee, number> {
  //attributes
  datalen: number;
  class_name: string;
  flag: boolean[] = [];
  stored_tblBody: object;
  headers: string[];
  Record: Array<any[]>;
  //object as attribute
  obj: operations = new operations();
  objB: ButtonOperations = new ButtonOperations();
  callBuisnessLogic() {
    this.obj.loadAndRefresh().then(response => {
      this.create(response);
    });
  }
  //----------------------------

  constructor() {
    let button = document.getElementById("LOAD");
    button!.addEventListener("click", this.loadAndRefresh);
  }
  loadAndRefresh() {
    if (document.getElementById("LOAD")!.innerHTML == "LOAD DATA") {
      document.getElementById("LOAD")!.innerHTML = "REFRESH DATA";
    } else {
      let div = document.getElementById("div1")! as HTMLElement;
      div.innerHTML = " ";
    }
    objp.callBuisnessLogic();
  }
  create(Emp: Employee[]) {
    //destructing
    this.datalen = Emp.length;
    this.Record = Emp.map(obj => Object.values(obj));
    console.log(this.Record);
    for (let i = 0; i < this.datalen; i++) {
      this.flag[i] = false;
    }
    let table = document.createElement("table");
    table.setAttribute("id", "empTable");
    table.setAttribute("class", "table  table-light table-hover");
    table.style.tableLayout = "fixed";
    let arrHeaders = new Array();
    arrHeaders = [
      "FirstName",
      "MiddleName",
      "LastName",
      "Email",
      "Phone",
      "Role",
      "Address",
      "Edit option",
      "Delete option"
    ];

    let tr = table.insertRow(-1);
    //create Headers
    for (let h = 0; h < arrHeaders.length; h++) {
      let th = document.createElement("th");
      th.setAttribute("class", "table table-dark");
      th.innerHTML = arrHeaders[h];
      tr.appendChild(th);
    }
    for (let c = 0; c < this.datalen; c++) {
      tr = table.insertRow(-1);
      tr.setAttribute("id", "row" + c);
      tr.style.textAlign = "center";
      tr.innerHTML =
        '<td  class="cell' +
        c +
        '">' +
        Emp[c].firstName +
        "</td>" +
        '<td  class="cell' +
        c +
        '">' +
        Emp[c].middleName +
        "</td>" +
        '<td  class="cell' +
        c +
        '">' +
        Emp[c].lastName +
        "</td>" +
        '<td  class="cell' +
        c +
        '">' +
        Emp[c].email +
        "</td>" +
        '<td  class="cell' +
        c +
        '">' +
        Emp[c].phone +
        "</td>" +
        '<td  class="cell' +
        c +
        '">' +
        Role[Emp[c].role] +
        "</td>" +
        '<td  class="cell' +
        c +
        '">' +
        Emp[c].address +
        "</td>" +
        '<td> <button type="button" class="btn btn-primary"    id="edit' +
        c +
        '"> edit </button></td>' +
        '<td> <button type="button" class = "btn btn-primary"  id="delete' +
        c +
        '"> delete </button></td>';
      this.class_name = "cell" + c;
    }
    document.getElementById("div1")!.appendChild(table);
    for (let c = 0; c < this.datalen; c++) {
      let idedit = "edit" + c;
      let iddelete = "delete" + c;
      this.objB.clickButtons(idedit, iddelete, c);
    }
  }

  editData(row_num: number) {
    if (this.flag[row_num] === false) {
      this.objB.SwitchButton(row_num);

      let id = "cell" + row_num;
      let index;
      let row_element = document.getElementsByClassName(id);
      for (index = 0; index < row_element.length; index++) {
        if (index === 5) {
          row_element[index].innerHTML = `<select id = "role">
            <option value ="0">QA</option>
            <option value ="1">Development</option>
            <option value ="2">DevOps</option>
            <option value = "3">UIDesign</option>
            </select>`;
        } else {
          row_element[index].setAttribute("contenteditable", "true");
        }
      }
    } else {
      this.objB.SwitchButton(row_num);
      let id = "cell" + row_num;
      let index;
      let ele = document.getElementsByClassName(id);
      for (index = 0; index < ele.length; index++) {
        if (index === 5) {
          ele[index].innerHTML =
            Role[+(ele[index].childNodes[0] as HTMLInputElement).value];
        } else {
          ele[index].setAttribute("contenteditable", "false");
        }
      }

      let row_array: any[] = [];
      let rowid = "row" + row_num;
      let row: HTMLTableRowElement = document.getElementById(
        rowid
      )! as HTMLTableRowElement;
      for (let i = 0; i < 7; i++) {
        if (i === 5) {
          row_array[i] = row.cells[i].innerHTML;
          // row_array[i] = Role[];
        } else {
          row_array[i] = row.cells[i].innerHTML;
        }
      }
      this.Record[row_num] = row_array;
      console.log(this.Record[row_num]);
    }
  }
  deleteData(row_num: number) {
    if (this.flag[row_num] === false) {
      console.log("inside delete ", this.flag);
      let rowid = "row" + row_num;
      let deleterow = document.getElementById(rowid.toString())! as HTMLElement;
      deleterow.parentNode!.removeChild(deleterow);
    } else {
      let row_array: any[] = [];
      let rowid = "row" + row_num;
      row_array = this.Record[row_num];
      console.log(this.Record[row_num]);
      console.log(row_array);
      let row: HTMLTableRowElement = document.getElementById(
        rowid
      )! as HTMLTableRowElement;
      for (let i = 0; i < 7; i++) {
        if (i === 5) {
          let check: string = typeof row_array[i];
          if (check === "number") {
            console.log(check);
            let x = row_array[i];
            row.cells[i].innerHTML = Role[x];
          } else if (check === "string") {
            console.log(check);
            row.cells[i].innerHTML = row_array[i];
          }
        } else row.cells[i].innerHTML = row_array[i];
      }
    }
    this.objB.SwitchButton(row_num);
  }
}

export let objp = new Presentation();