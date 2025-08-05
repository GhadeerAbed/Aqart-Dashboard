"use client"

import React, { useEffect, useState } from 'react';
import { InvoiceTable } from '../Membership/components/page';
import { Activity_columns } from './data/page';
import { useSWRHook } from '@/hooks/page';
import { API_SERVICES_URLS } from '@/data/page';

import { TableProps } from '@/types/page';
import {ViewActivity} from './components/page'
import { getAuthData } from '@/utils/page';


export type ActivityVariantsType = 'Add' | 'Update' | 'Delete' | 'ChangePassword' | 'AccessControl';

type ActivityProps = {
  id?: string;
  type?: ActivityVariantsType;
  page?: string;
  limit?: string;
};

const authData = getAuthData();
const userId = authData?._id || "";



export const Activity: React.FC<ActivityProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0); 
  const [selectedType, setSelectedType] = useState<ActivityVariantsType>('Update');
  const [tableData, setTableData] = useState<TableProps[]>([]);
 const userId = getAuthData()?._id;


  const { data: responseData, isLoading } = useSWRHook(API_SERVICES_URLS.GET_USER_ACTIVITIES(userId, selectedType, currentPage));

  useEffect(() => {
    if (responseData && responseData.isSuccessed) {
      const { data, paginationResult, totalCount } = responseData.data;
      const mappedData = data.map((activity: any) => ({
        id:activity._id,
        date: new Date(activity.createdAt).toLocaleDateString(),
        activity: activity.activitySubject,
        activity_type: activity.type,
      }));
      setTableData(mappedData);
      setTotalPages(paginationResult.numberOfPages);
      setTotalEntries(totalCount); // Set the total entries for all pages
    }
  }, [responseData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type as ActivityVariantsType);
    setCurrentPage(1); // Reset to first page on type change
  };

  return (
    <div>
      <div className="max-w-[1000px]">
       <div className='flex justify-end items-center pt-5'> <ViewActivity onSelect={handleTypeChange}/> </div>
        <div className="bg-lightSecondary rounded-[15px] mt-2 pt-4">
        {isLoading ? (
            <div className=' flex justify-center items-center py-3'>
            <p>Data is Loading...</p>
            </div>
          ) : (
            <InvoiceTable
              columns={Activity_columns}
              data={tableData}
              showCheckboxes={false}
              allowSorting={false}
              allowHideen={false}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalEntries={totalEntries}
            />
          )}
        </div>
       
      </div>
    </div>
  );
};

export default Activity;
