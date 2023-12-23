// type QueryParams = {
//     page: number;
//     limit: number;
//   }

//In mongo if the page limit is 0 then it will return all the data
const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1;

export function getPagination(query: any ) {
    //convert query string to number as well as absolute value
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT ;
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;

    return { 
        skip: (page - 1) * limit, 
        limit 
    };
}