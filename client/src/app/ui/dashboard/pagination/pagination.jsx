"use client"
import styles from './pagination.module.css';
import { usePathname,useSearchParams,useRouter } from 'next/navigation';
// define page


const Pagination = ({count}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname(); // ใช้ useRouter แทนการใช้ usePathname
  const {replace} = useRouter();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 2;

  const hasPav = ITEM_PER_PAGE * (parseInt(page)-1) >0
  const hasNext = ITEM_PER_PAGE * (parseInt(page)-1) + ITEM_PER_PAGE < count

  const handleChangePage = (type) => {
    type === "prev" 
    ? params.set("page", parseInt(page)-1) 
    : params.set("page", parseInt(page)+1);
    // next+1 prev-1 
    replace(`${pathname}?${params}`);
  };
// counst = define amout page
    return (
      <div className={styles.container}>
        <button className={styles.button} disabled={!hasPav} onClick={() => handleChangePage("prev")}>Previous</button>
        <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")} >Next</button>
      </div>
    );
}

export default Pagination;
