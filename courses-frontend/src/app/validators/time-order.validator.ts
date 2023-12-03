import { AbstractControl } from "@angular/forms";

function timeOrderValidator(control: AbstractControl) {
  const timeStart = control.parent?.value['timeStart'];

  if (!timeStart || !control.value)
    return null;

  const [startHours, startMinutes] = timeStart.split(':').map((str: string) => parseInt(str));
  const [finishHours, finishMinutes] = control.value.split(':').map((str: string) => parseInt(str));

  // if (!startHours || !startMinutes && !finishHours && !finishMinutes)
  //   return null;

  if (startHours < finishHours)
    return null;
  else if (startHours === finishHours) {
    if (startMinutes < finishMinutes)
      return null;
    else
      return { 'wrongTimeOrder': 'Czas zakończenia powinna być większy niż czas rozpoczęcia.' };
  } else
    return { 'wrongTimeOrder': 'Czas zakończenia powinna być większy niż czas rozpoczęcia.' };
}
export default timeOrderValidator;
