import {
    PlusOutlined
  } from '@ant-design/icons';
import { Button, Space, Table, Tag, Popconfirm, Input, InputRef, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { productsHooks, productsActions, productsApi } from 'app/containers/Admin/Product';
import { ServiceTable } from 'common/components/ServiceTable';
import { PAGE, PAGE_SIZE } from 'constants/products';
import { Category } from 'models/category';
import { Product } from 'models/product';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { TagSeo } from 'models/tagSeo';

import './TagSeoItems.less'
import { settingsHooks } from '../../hooks';

interface DataType {
  tags: any
}

interface IProps {
    data: TagSeo[];
    onChangeTagSeo: (data: TagSeo[]) => void;
  }

const TagSeoItems = ({ data, onChangeTagSeo } : IProps): JSX.Element => {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState<any>([]);
  const intl = useIntl();

  const [tags, setTags] = useState<TagSeo[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  const { mutateAsync: updateTagSeo, isLoading: isLoadingUpdateTagSeo } = settingsHooks.useUpdateTagSeo();
  const { mutateAsync: createTagSeo, isLoading: isLoadingCreateTagSeo } = settingsHooks.useCreateTagSeo();
  const { mutateAsync: deleteTagSeo, isLoading: isLoadingDeleteTagSeo } = settingsHooks.useDeleteTagSeo();

  console.log('=== TagSeoItems data', data)
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
    // const newTags = tags.filter(tag => tag.name !== name);
    const removeTag = tags.find(tag => tag.name === name);

    // console.log('==== handleClose newTags', removeTag);
    const tag = await deleteTagSeo(removeTag);
    const newTags = tags.filter(item => item.name !== tag.name);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const dataChanged = tags.filter(tag => tag.name === e.target.value)
    setInputValue(e.target.value);
  };

  const handleInputConfirm = async () => {
    // console.log('==== handleInputConfirm inputValue', inputValue)
    const tagSeoExisting = tags?.filter(item => item.name === inputValue)
    // console.log('==== handleInputConfirm tagSeoExisting', tagSeoExisting)

    // const newTagSeo = { name: inputValue }

    if (inputValue && tagSeoExisting && tagSeoExisting.length === 0) {
      
      // onChangeTagSeo(tagUpdate);
      const tag = await createTagSeo({ name: inputValue });
      // console.log('==== tag', tag);
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
    // const itemUpdate = tags.find(item => )
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
            // closable={index !== 0}
            closable={true}
            onClose={() => handleClose(tag?.name as string)}
          >
            <span
              onDoubleClick={e => {
                // if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag?.name as string);
                  e.preventDefault();
                // }
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
