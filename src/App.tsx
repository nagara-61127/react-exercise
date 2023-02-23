import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
	faCircle,
	faCheckCircle,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";

type Item = {
  itemName: string;
  quantity: number;
  isSelected: boolean;
}

const App = () => {
	const [items, setItems] = useState<Item[]>([]);

	return (
		<div className="app-background">
			<div className="main-container">
				<div className="add-item-box">
					<input className="add-item-input" placeholder="Add an item..." />
					<FontAwesomeIcon icon={faPlus} />
				</div>
				<div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name">
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ):(
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{item.quantity}</span>
                <button>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          ))}
					<div className="item-container"></div>
				</div>
				<div className="total">Total: </div>
			</div>
		</div>
	);
};

export default App;