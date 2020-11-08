import React, { useState } from "react";
import cn from "classnames";
import styles from "../../styles/ui/dropdown.module.scss";
import inputStyles from "../../styles/ui/input.module.scss";
import { dynamicForm } from "../interfaces";

export interface DropdownProps {
  name: string;
  list: string[];
  label: string;
  formData: dynamicForm;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  required?: boolean;
  style?: React.CSSProperties | undefined;
  placeholder?: string;
}

const capitalize = (s: string) => {
  return s && s[0].toUpperCase() + s.slice(1);
};

/**
 * A Dropdown component which handles its own state.
 *
 * @param name name of the input
 * @param list array of string including options of the dropdown\
 * @param label label for the input
 * @param formData A json of inputs on a screen. (The name represents the key for this input)
 * @param setFormData React dispatch function to change the formData json.
 * @param style CSS styles (optional)
 * @param required Input required or not(true be default)
 * @param placeholder placeholder for the input.
 */
const Dropdown = ({
  name,
  list,
  label,
  formData,
  setFormData,
  style,
  required = true,
  placeholder,
}: DropdownProps) => {
  // to easily keep track if the input was focused or not.
  const [isFocused, setFocus] = useState(false);
  // to show the dropdown or not
  const [dropShow, setDropShow] = useState(false);

  // returns the ul list of options
  const dropList = (list: string[]) => {
    return (
      <ul className={styles.drop__list} id="myDropdown">
        {list.map((item, index) => {
          return (
            <li key={index}>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev: dynamicForm) => {
                    return { ...prev, [name]: capitalize(item) };
                  })
                }
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  /**
   * util function to handle input focus event
   */
  const focused = () => {
    setFocus(true);
    setDropShow(true);
  };

  /**
   * util function to handle input blur event
   */
  const unFocused = () => {
    setFocus(false);

    // without timeout the selected option is not selected
    setTimeout(() => setDropShow(false), 200);

    if (!list.filter((item) => item === formData[name]).length) {
      setFormData((prev: dynamicForm) => {
        return { ...prev, [name]: "" };
      });
    }
  };

  /**
   * util function to filter options based on input
   */
  const filterFunction = () => {
    const value = formData[name];
    const filter = value.toUpperCase();
    const div = document.getElementById("myDropdown");
    const buttons = div!.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      const txtValue = buttons[i].textContent || buttons[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        buttons[i].style.display = "";
      } else {
        buttons[i].style.display = "none";
      }
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="input" className={inputStyles.label}>
        {label}
      </label>
      <div className={inputStyles.container} style={style}>
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={formData[name]}
          className={inputStyles.input}
          required={required}
          onFocus={focused}
          onBlur={unFocused}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prev: dynamicForm) => {
              return { ...prev, [name]: capitalize(newValue) };
            });
          }}
          onKeyUp={filterFunction}
        />

        <div className={cn({ [styles.open]: isFocused })}>
          <div className={styles.arrow}></div>
        </div>
      </div>
      {dropShow && dropList(list)}
    </div>
  );
};

export default Dropdown;
