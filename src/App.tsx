import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

type Item = {
  itemName: string;
  quantity: number;
  isSelected: boolean;
};

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(0);

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue('');
    culculateTotal();
  };

  const toggleChange = (index: number) => {
    const changeItems = [...items];
    changeItems[index].isSelected = !changeItems[index].isSelected;
    setItems(changeItems);
    culculateTotal();
  };

  const handleChangeQuantity = (
    index: number,
    fluctuation: 'increase' | 'decrease'
  ) => {
    const changeItems = [...items];
    if (fluctuation === 'decrease' && changeItems[index].quantity === 0) {
      if (window.confirm('アイテムを削除しますか？')) {
        deleteItem(index);
      }
    } else {
      switch (fluctuation) {
        case 'increase':
          changeItems[index].quantity++;
          break;
        case 'decrease':
          changeItems[index].quantity--;
          break;
      }
      setItems(changeItems);
    }
    culculateTotal();
  };

  const deleteItem = (index: number) => {
    const changeItems = [...items];
    changeItems.splice(index, 1);
    setItems(changeItems);
  };

  const culculateTotal = () => {
    let total = 0;
    items.map((item) => (total = total + item.quantity));
    setTotalItemCount(total);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name">
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      onClick={() => toggleChange(index)}
                    />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faCircle}
                      onClick={() => toggleChange(index)}
                    />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button onClick={() => handleChangeQuantity(index, 'decrease')}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleChangeQuantity(index, 'increase')}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          ))}
          <div className="item-container"></div>
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
