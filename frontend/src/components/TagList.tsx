type TTagList = {
  items: string[];
};

export default function TagList({ items }: TTagList) {
  return (
    <ul className='flex flex-row'>
      {items.length > 0 &&
        items.map((item, idx) => (
          <li
            key={`${idx}_${item}`}
            className='mr-1 rounded-sm bg-slate-600 px-2 text-xs text-slate-300'
          >
            {item}
          </li>
        ))}
    </ul>
  );
}
