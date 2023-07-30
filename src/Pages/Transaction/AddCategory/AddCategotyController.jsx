import React, { useState } from "react";
import AddCategoryUI from "./AddCategoryUI";

const AddCategoryController = () => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        err: '',
        emoji: '',
        description: '',
    }) // Set your default emoji here
    const defaultEmoji = "😀";
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    const handleEmojiClick = (emojiObject,event) => {
        setChosenEmoji(emojiObject);
        console.log(emojiObject.emoji)
        setShowPicker(false); // Hide the emoji picker after selecting an emoji
    };

    const handleEmojiButtonClick = () => {
        setShowPicker(true); // Show the emoji picker on button click
    };
    return (
        <>
            <AddCategoryUI loading={loading} formValues={formValues} setFormValues={setFormValues} handleEmojiButtonClick={handleEmojiButtonClick} handleEmojiClick={handleEmojiClick} chosenEmoji={chosenEmoji} showPicker={showPicker} defaultEmoji={defaultEmoji}/>
        </>
    )
}

export default AddCategoryController;