import { useSelector } from '../redux/store';

export const useCourse = () => ({ ...useSelector((state: any) => state.course) });
