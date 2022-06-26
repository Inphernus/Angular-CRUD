import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  itemCondition = ["Garbage", "Used", "New"];
  itemForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuilder:FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData : any) { }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      itemName : ['', Validators.required],
      category : ['', Validators.required],
      condition : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required],
    })

    if(this.editData){
      this.actionBtn = "Update"
      this.itemForm.controls['itemName'].setValue(this.editData.itemName);
      this.itemForm.controls['category'].setValue(this.editData.category);
      this.itemForm.controls['condition'].setValue(this.editData.condition);
      this.itemForm.controls['price'].setValue(this.editData.price);
      this.itemForm.controls['comment'].setValue(this.editData.comment);
      this.itemForm.controls['date'].setValue(this.editData.date);
    }
  }

  addItem(){
   if(!this.editData){
    if (this.itemForm.valid){
      this.api.postItem(this.itemForm.value)
      .subscribe({
        next:(res)=> {
          alert("Item Added!");
          this.itemForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Item is not added.")
        }
      })
    } 
    } else {
    this.updateItem()
   }
  }

  

  updateItem(){
    this.api.putItem(this.itemForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Item updated successfully!");
        this.itemForm.reset();
        this.dialogRef.close('update');
      }, 
      error:()=>{
        alert("Error while updating item.");
      }
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
