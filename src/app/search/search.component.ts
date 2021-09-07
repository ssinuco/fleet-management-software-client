import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PointsService} from "../core/services/points.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {debounceTime, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Taxi} from "../core/models/taxi.model";
import {TaxisService} from "../core/services/taxis.service";
import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  form = new FormGroup({
    taxi: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });
  isTaxisLoading = false;
  taxis: any;
  startDate = moment([2008, 1, 2]);

  @Output()
  change = new EventEmitter();

  constructor(private pointsService: PointsService, private taxisService: TaxisService) {
  }

  ngOnInit(): void {
    this.form.get('taxi').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.isTaxisLoading = true;
          this.taxis = [];
        }),
        switchMap(query =>
          this.taxisService.getTaxis(query)
            .pipe(
              finalize(() => {
                this.isTaxisLoading = false;
              })
            )
        ),
      )
      .subscribe(data => {
        this.taxis = data;
      });
    ;
  }

  displayFn(taxi: Taxi): string {
    return taxi && taxi.plate ? taxi.plate : '';
  }

  get taxi() {
    return this.form.get('taxi');
  }

  get date() {
    return this.form.get('date');
  }

  view(): void {
    if (!this.taxi.errors && !this.date.errors) {
      console.log(this.date);
      this.pointsService.getPoints(this.taxi.value, this.date.value.format('YYYY-MM-DD')).subscribe(points => this.change.emit(points));
    }
  }
}
