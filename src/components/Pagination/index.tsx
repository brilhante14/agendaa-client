import React from "react";

import './index.css'

type PaginationProps = {
   totalPages?: number,
   currentPage: number, 
   onPageChange: (page: number) => void,
}

const Pagination = ({totalPages = 0, currentPage, onPageChange}: PaginationProps) => {
   if (totalPages < 2) return null;

   const paginationRange = () => {
      const range = (start: number, end: number) => {
         let length = end - start + 1;
         return Array.from({ length }, (_, idx) => idx + start);
      };

      if(totalPages < 5) return range(1, totalPages)
   
      const shouldShowLeftDots = currentPage > 3;
      const shouldShowRightDots = currentPage + 3 < totalPages; 

      if(!shouldShowLeftDots && shouldShowRightDots){
         const leftRange = range(1, 5);
         return [...leftRange, -1, totalPages];
      } else if (shouldShowLeftDots && !shouldShowRightDots){
         const rightRange = range(totalPages - 4, totalPages);
         return [1, -1, ...rightRange];
      }  else {
         const middleRange = range(currentPage-1, currentPage+1);
         return [1, -1, ...middleRange, -1, totalPages];
      }  
   }

   const onNext = () => {
      onPageChange(currentPage + 1);
   };
  
   const onPrevious = () => {
      onPageChange(currentPage - 1);
   };
  

   return (
   <>
   <ul className="pagination_container">
      <li 
         className={currentPage === 1 ? "pagination_item arrowDisabled" : "pagination_item arrow"}
         onClick={currentPage === 1 ? undefined : onPrevious}
      >
         &#60;
      </li>
      {paginationRange().map(pageNumber => {
        if (pageNumber === -1) {
          return <li className="pagination_item dots">&#8230;</li>;
        }
		
        return (
          <li
            className={pageNumber === currentPage ? "pagination_item selected" : "pagination_item"}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={currentPage === totalPages ? "pagination_item arrowDisabled" : "pagination_item arrow"}
         onClick={currentPage === totalPages ? undefined : onNext}
      >
         &#62;
      </li>
    </ul>
   </>
   
   );
}

export default Pagination;