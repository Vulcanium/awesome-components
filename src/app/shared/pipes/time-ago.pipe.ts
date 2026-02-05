import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {

  timeDiffs = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  };

  transform(value: string | Date): string {
    const now = Date.now();
    const before = new Date(value).getTime();
    const diff = now - before;

    if (diff < this.timeDiffs.minute) {
      return 'A few seconds ago';
    }

    if (diff < this.timeDiffs.hour) {
      return 'A few minutes ago';
    }

    if (diff < this.timeDiffs.day) {
      return 'A few hours ago';
    }

    if (diff < this.timeDiffs.week) {
      return 'A few days ago';
    }

    if (diff < this.timeDiffs.month) {
      return 'A few weeks ago';
    }

    if (diff < this.timeDiffs.year) {
      return 'A few months ago';
    }

    return 'More than a year ago';
  }

}
