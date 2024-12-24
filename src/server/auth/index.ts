import { getServerSession } from 'next-auth';
import { authOptions } from './config';

export type { Session } from 'next-auth';

export const auth = () => getServerSession(authOptions);
