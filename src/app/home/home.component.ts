import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals',[
      transition('* => *', [
        query(':enter',style({opacity:0}),{optional: true}),
        query(':enter',stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'trasnlateY(-75%)', offset:0}),
            style({opacity: .5, transform: 'trasnlateY(35%)', offset:.3}),
            style({opacity: 1, transform: 'trasnlateY(0%)', offset:1}),
          ]))
        ]), {optional:true}),

        query(':leave',stagger('300ms',[
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'trasnlateY(0%)', offset:0}),
            style({opacity: .5, transform: 'trasnlateY(35%)', offset:.3}),
            style({opacity: 0, transform: 'trasnlateY(-75%)', offset:1}),
          ]))
        ]), {optional:true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = [];

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res => this.goals=res);
    this._data.changeGoal(this.goals);

    this._data.getGoals()
     .subscribe((data: any) => {
      alert(JSON.stringify(data.content));

      this.goals = data.content;
      this._data.changeGoal(this.goals);

    });
  }
  addItem(){
    var payload = {
      title : this.goalText,
      description : this.goalText
    }
    // this.goals.push(this.goalText);
    // this.goalText = "";
    // this.itemCount = this.goals.length;
    // this._data.changeGoal(this.goals);
    this._data.newGoal(payload).subscribe((data: any) => {
   
      this.goals.push(payload);
      this.goalText='';
      this.itemCount=this.goals.length;
      this._data.changeGoal(this.goals);

   });
  }

  removeItem(i){
    this.goals.splice(i,1);
    this._data.changeGoal(this.goals);
  }

}
