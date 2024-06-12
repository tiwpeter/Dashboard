"use client"

import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';
import { usePathname,useSearchParams,useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';




const Search = ({ placeholder }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname(); // ใช้ useRouter แทนการใช้ usePathname
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);

        params.set("page",1);
        // find for page

        if (e.target.value.length > 2) {
          // seach with sitng 2 most scen
            params.set("q", e.target.value);
        } else {
            params.delete("q");
        }

        replace(`${pathname}?${params}`); // ใช้ router.replace แทน replace
    }, 300);

    return (
        <div className={styles.container}>
            <MdSearch />
            <input
                type="text"
                placeholder={placeholder}
                className={styles.input}
                onChange={handleSearch.callback}
            />
        </div>
    );
};

export default Search;
