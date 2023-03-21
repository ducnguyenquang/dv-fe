import {
    PlusOutlined
  } from '@ant-design/icons';
import { Tag, Input, InputRef, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { TagSeo } from 'models/tagSeo';

import './TagSeoItems.less'
import { settingsHooks } from 'app/containers/Admin/Setting/hooks';


interface IProps {
    data: TagSeo[];
    onChangeTagSeo: (data: TagSeo[]) => void;
  }

const TagSeoItems = ({ data, onChangeTagSeo } : IProps): JSX.Element => {
  const [tags, setTags] = useState<TagSeo[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const { mutateAsync: updateTagSeo } = settingsHooks.useUpdateTagSeo();
  const { mutateAsync: createTagSeo } = settingsHooks.useCreateTagSeo();
  const { mutateAsync: deleteTagSeo } = settingsHooks.useDeleteTagSeo();

  useEffect(() => {
    if (data) {
      setTags(data);
    }
  }, [data]);
  
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = async (name: string) => {
    const removeTag = tags.find(tag => tag.name === name);
    const tag = await deleteTagSeo(removeTag);
    const newTags = tags.filter(item => item.name !== tag.name);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = async () => {
    const tagSeoExisting = tags?.filter(item => item.name === inputValue)
    if (inputValue && tagSeoExisting && tagSeoExisting.length === 0) {
      const tag = await createTagSeo({ name: inputValue });
      const tagUpdate = [...tags, tag]
      setTags(tagUpdate);
    } else {
      await updateTagSeo({ ...tagSeoExisting, name: inputValue});
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = async () => {
    const newTags = tags;

    newTags[editInputIndex].name = editInputValue;
    await updateTagSeo(newTags[editInputIndex]);

    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  return (
    <>
      {tags?.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag.name}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.name && tag.name.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag.name}

            closable={true}
            onClose={() => handleClose(tag?.name as string)}
          >
            <span
              onDoubleClick={e => {
                  setEditInputIndex(index);
                  setEditInputValue(tag?.name as string);
                  e.preventDefault();
              }}
            >
              {isLongTag && tag.name ? `${tag.name.slice(0, 20)}...` : tag.name}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag.name} key={tag.name}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default TagSeoItems;
