css module

```css
:global(.g){

}

.c{

}

import s from '*.module.css'

className={s.c}=>load .c  or className="g" =>load global(g)
```

## use Hook

- useState
  - 當有變動re-render(畫面會重新刷新)
  
- useRef
  - 儲存資料 數值變動 畫面不會 re-render
  
- useEffect
  - useEffect Mistacke 
    - [yt](https://www.youtube.com/results?search_query=+don%27t+use+useEffect)
    - [UseEffect called twice in React 18 - How to fix it?](https://www.youtube.com/watch?v=MXSuOR2yRvQ)
  - shouldn't we use useEffect?



# BUG 

delet scene ,level scene_id_array不同步
登出cookie session未刪除