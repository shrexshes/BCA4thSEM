# Steps 

1. Install Vite : npm create vite@latest
2. Install tailwind and react-router-dom : npm install tailwindcss @tailwindcss/vite,  npm i react-router-dom
3. Remove all the format that comes with vite
4. To create Page in react you have to import BrowserRouter, Route,Routes
```python
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
        </Routes>
    </BrowserRouter>
```

