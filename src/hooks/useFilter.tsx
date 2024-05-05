import { useEffect, useState } from "react";

export interface IFilter<T> {
  field: string;
  initialValue: any;
  validator: (item: T, value: any) => boolean;
}
type FilterFunction = (initalFieldValue: any) => any;

export function useFilters<T>({
  filtersDef,
  items,
  operator = "AND",
}: {
  filtersDef: IFilter<T>[];
  items: T[];
  operator?: "OR" | "AND";
}) {
  const [filters, setFilters] = useState(filtersDef);
  const [data, setData] = useState(items);
  const [loading, setLoading] = useState<boolean>(false);
  const validate = () => {
    if (!filters) {
      return;
    }
    setLoading(true);
    let initial = Object.assign(items);
    if (operator == "AND") {
      initial = data.filter((item) => {
        const res = filters.every((e) => {
            console.log(e.validator(item, e.initialValue));
            
          return e.validator(item, e.initialValue);
        });
        return res;
      });
    } else {
      initial = data.filter((item) => {
        const res = filters.some((e) => {
          return e.validator(item, e.initialValue);
        });
        return res;
      });
    }

    setLoading(false);
    return initial;
  };

  const handleFilterChange = (field: any, fn: any | FilterFunction) => {
    const temp = filters.map((filter: any) => {
      if (filter.field == field) {
        if (typeof fn == "function") {
          filter.initialValue = fn(filter.initialValue);
        } else {
          filter.initialValue = fn;
        }
        return filter;
      }
      return filter;
    });

    setFilters(temp);
  };
  useEffect(() => {
    setData(validate());
  }, [filters]);

  return {
    handleFilterChange,
    filters: filters,
    data: data,
    loading: loading,
  };
}
