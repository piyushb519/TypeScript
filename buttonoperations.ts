import { objp } from "./presentation.js";
export class ButtonOperations {
    clickButtons(idEdit:string, idDelete:string,rowid:number) {

        let editButton = document.getElementById(idEdit)! as HTMLTableRowElement;
        editButton.onclick = () => {
          objp.editData(rowid);
        };
        //add delete button --------------------------
        let deleteButton = document.getElementById(idDelete)! as HTMLTableRowElement;
        deleteButton.onclick = () => {
          objp.deleteData(rowid);
        };
      }
  SwitchButton(b: number) {
    let id_edit = "edit" + b;
    let id_delete = "delete" + b;
    console.log(objp.flag);
    if (objp.flag[b] === false) {
      //change to save and cancel
      document.getElementById(id_edit)!.innerHTML = "save";
      document.getElementById(id_delete)!.innerHTML = "cancel";
      objp.flag[b] = true;
      console.log("swtiching buttons to save and cancel and flag is = ", objp.flag[b]);


    } else {
      document.getElementById(id_delete)!.innerHTML = "delete";
      document.getElementById(id_edit)!.innerHTML = "edit";
      objp.flag[b] = false;
      console.log("swtiching buttons back to edit and delete and flag = ", objp.flag[b]);

    }
  }

}