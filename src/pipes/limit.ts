import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterHanzi'
})
export class FilterHanziPipe implements PipeTransform {
    transform(hanzi: string, value: number): any {
        if (hanzi.length > value) {
            hanzi = hanzi.slice(0, value) + '...';
        }
        console.log(hanzi)
        return hanzi;
    }
}