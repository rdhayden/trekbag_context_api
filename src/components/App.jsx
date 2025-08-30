import Background from './Background';
import Footer from './Footer';
import '../index.css';
import Header from './Header';
import ItemList from './ItemList';
import SideBar from './SideBar';
import { INITIALITEMS } from '../lib/constants';
import { useEffect, useState } from 'react';

function App() {
  // You pass an initial value to useState, it is only used on first render
  // so if you pass a function to useState, it will only be called once
  // we can use this to check local storage for items and set the initial value
  // without the performance overhead of checking local storage on every render
  // if local storage is empty we will use the initial items
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('items')) || INITIALITEMS
  );

  const handleAddItem = (text) => {
    setItems(() => {
      return [
        ...items,
        {
          id: Date.now(),
          completed: false,
          text: text,
        },
      ];
    });
  };

  const handleDeleteItem = (id) => {
    setItems(() => {
      return items.filter((item) => item.id !== id);
    });
  };

  const handleToggleItem = (id) => {
    setItems(() => {
      return items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
    });
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetToInitial = () => {
    setItems(INITIALITEMS);
  };

  const handleMarkAllAsComplete = () => {
    setItems(() => {
      return items.map((item) => {
        return {
          ...item,
          completed: true,
        };
      });
    });
  };

  const handleMarkAllAsIncomplete = () => {
    setItems(() => {
      return items.map((item) => {
        return {
          ...item,
          completed: false,
        };
      });
    });
  };

  // Persist items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <Background />
      <main>
        <Header
          itemsCompleted={items.filter((item) => item.completed).length}
          itemsTotal={items.length}
        />
        <ItemList
          items={items}
          handleDeleteItem={handleDeleteItem}
          handleToggleItem={handleToggleItem}
        />
        <SideBar
          handleAddItem={handleAddItem}
          handleRemoveAllItems={handleRemoveAllItems}
          handleResetToInitial={handleResetToInitial}
          handleMarkAllAsComplete={handleMarkAllAsComplete}
          handleMarkAllAsIncomplete={handleMarkAllAsIncomplete}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
