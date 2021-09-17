import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Burn } from '../models/burn';
import { Burns } from '../shared/mock-burns';

export class BurnsService {

    getBurns(): Burn[] {

        return Burns;
      }

}