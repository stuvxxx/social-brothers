import React from 'react';
import "../styles/pagination.css"

const Pagination = (props)=>{

    const { currentPage, maxPageLimit, minPageLimit} = props;
    const totalPages = props.response.last_page-1;

    const pages = [];
    for(let i = 1 ; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePrevClick = () => {
        props.onPrevClick();
    }

    const handleNextClick = () => {
        props.onNextClick();
    }

    const handlePageClick = (e) => {
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {
        if ( page <= maxPageLimit  && page > minPageLimit) {
            return(
        <li key={ page } 
            id={ page } 
            onClick={ handlePageClick } 
            className={ currentPage === page ? 'active' : null}>
            { page }
        </li>
            );
        }
        else {
            return null;
        }
    }
 );

     return (
        <div className="pagi-wrapper">
            <ul className="pageNumbers"> 
               <li>
                   <button 
                   onClick={handlePrevClick} 
                   disabled={currentPage === pages[0]}>Prev</button>
               </li>
                {pageNumbers}
                <li>
                   <button 
                   onClick={handleNextClick} 
                   disabled={currentPage === pages[pages.length-1]}>Next</button>
               </li>
            </ul>
        </div>
    )
}

export default Pagination;
