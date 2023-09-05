import { useToast } from "vue-toastification";
const toast: any = useToast();

const MakeToast = (text: string, toastType: any, time: number) => {
  toast[toastType](text, { timeout: time });
};
export default MakeToast;
