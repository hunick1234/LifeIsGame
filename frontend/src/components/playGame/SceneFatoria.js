import React from "react";
import PropTypes from "prop-types";

import Talk from "./scene/talk";
import { common } from "@mui/material/colors";

const COMPONENT_TYPES = {
  TYPE_TALK: "Talk",
  TYPE_STORY: "Story",
  TYPE_BRANCH: "Branch",
};

// 根据类型返回对应组件的工厂函数
const ComponentFactory = {
  [COMPONENT_TYPES.TYPE_TALK]: () => (
    <Talk
      content={[
        { stalker: "a", scontent: "hi" },
        { stalker: "b", scontent: "hi" },
      ]}
      step={0}
    />
  ),
  [COMPONENT_TYPES.TYPE_STORY]: () => <Talk />,
  [COMPONENT_TYPES.TYPE_BRANCH]: () => <Talk />,
};

// 根据类型获取对应组件的函数
const getComponentByType = (type) => ComponentFactory[type] || null;

// 使用示例
const SceneComponent = ({ type }) => {
  // 根据类型获取对应组件
  const Component = getComponentByType(type);

  if (!Component) {
    return null; // 处理无效类型的情况，可根据实际需求进行调整
  }

  return <Component />;
};

SceneComponent.propTypes = {};

export default SceneComponent;
