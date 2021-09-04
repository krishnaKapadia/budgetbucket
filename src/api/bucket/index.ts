/** @format */
import * as Models from '../../models';
import { apiClient } from '../init';

export async function Retrieve(userId: string): Promise<Models.Bucket[]> {
  if(!userId) {
    return Promise.reject();
  }

  const { data, error } = await apiClient.from('bucket').select("*").eq("userId", userId);
  
  if(error) {
    throw error;
  }

  return Promise.resolve(data);
}