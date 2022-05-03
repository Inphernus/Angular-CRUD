import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  itemCondition = ["Garbage", "Used", "New"];
  itemForm !: FormGroup;
  constructor(private formBuilder:FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      itemName : ['', Validators.required],
      category : ['', Validators.required],
      condition : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required],
    })
  }

  addItem(){
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
  }

}
