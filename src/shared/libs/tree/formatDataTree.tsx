import { ReactNode } from 'react'

// Define TreeData type locally since we removed antd
interface TreeDataNode {
  title?: ReactNode
  key?: string | number
  children?: TreeDataNode[]
  icon?: ReactNode
}

type TreeData = TreeDataNode[]

interface FormatDataForTreeProps<
  WithChildren extends Record<string, unknown>,
  ExtraData extends Record<string, unknown>,
> {
  withChildrenArray: WithChildren[]
  extraDataArray: ExtraData[]

  titleKey: keyof WithChildren
  uuidKey: keyof WithChildren
  childrenKey: keyof WithChildren

  // extra
  extraTitleKey: keyof ExtraData
  extraUuidKey: keyof ExtraData
  extraChildrenKey?: keyof WithChildren // делаем опциональным
  // helpers

  renderExtraTitle?: (record: ExtraData) => ReactNode
}

export const formatDataForTree = <
  WithChildren extends Record<string, unknown>,
  ExtraData extends Record<string, unknown>,
>({
  withChildrenArray,
  extraDataArray,
  titleKey,
  uuidKey,
  childrenKey,
  extraTitleKey,
  extraUuidKey,
  extraChildrenKey,

  // renders
  renderExtraTitle,
}: FormatDataForTreeProps<WithChildren, ExtraData>): TreeData => {
  const withChildren = withChildrenArray?.map((item) => {
    const title = item[titleKey] as unknown
    const key = item[uuidKey] as unknown
    const children = Array.isArray(item[childrenKey])
      ? (item[childrenKey] as WithChildren[])
      : []
    const extraDataChildren =
      extraChildrenKey && Array.isArray(item[extraChildrenKey])
        ? (item[extraChildrenKey] as ExtraData[])
        : []

    return {
      title:
        typeof title === 'string' || typeof title === 'number'
          ? title
          : undefined,
      key: typeof key === 'string' || typeof key === 'number' ? key : undefined,
      // icon: (
      //   <ArrowDown
      //     size={20}
      //     className="flex items-center !m-[0_auto] h-[100%] rotate-[270deg]"
      //   />
      // ),
      children: formatDataForTree<WithChildren, ExtraData>({
        withChildrenArray: children,
        extraDataArray: extraDataChildren,
        titleKey,
        uuidKey,
        childrenKey,
        extraTitleKey,
        extraUuidKey,
        extraChildrenKey, // передаем, если определено
        renderExtraTitle,
      }),
    }
  })

  const extraData = extraDataArray?.map((item) => {
    const title = item[extraTitleKey] as unknown
    const key = item[extraUuidKey] as unknown

    const titleWihRender = renderExtraTitle
      ? renderExtraTitle(item)
      : typeof title === 'string' || typeof title === 'number'
        ? title
        : undefined

    return {
      title: titleWihRender,
      key: typeof key === 'string' || typeof key === 'number' ? key : undefined,
    }
  })

  return [...(withChildren || []), ...(extraData || [])] as TreeData
}

/**
 * Formats data for use in a tree structure, combining two arrays of data with specified keys.
 *
 * @param withChildrenArray - Array of objects containing children data.
 * @param extraDataArray - Array of additional data objects.
 * @param titleKey - Key to extract the title from withChildrenArray.
 * @param uuidKey - Key to extract the unique identifier from withChildrenArray.
 * @param childrenKey - Key to extract children from withChildrenArray.
 * @param extraTitleKey - Key to extract the title from extraDataArray.
 * @param extraUuidKey - Key to extract the unique identifier from extraDataArray.
 * @param extraChildrenKey - Optional key to extract children from extraDataArray.
 * @param renderExtraTitle - Optional function to render the title for extraDataArray.
 *
 * @returns A formatted tree data structure compatible with TreeProps['treeData'].
 *
 * @example
 * const withChildren = [
 *   { id: 1, name: 'Parent', children: [{ id: 2, name: 'Child' }] },
 * ];
 * const extraData = [
 *   { id: 3, name: 'Extra' },
 * ];
 * const treeData = formatDataForTree({
 *   withChildrenArray: withChildren,
 *   extraDataArray: extraData,
 *   titleKey: 'name',
 *   uuidKey: 'id',
 *   childrenKey: 'children',
 *   extraTitleKey: 'name',
 *   extraUuidKey: 'id',
 * });
 * console.log(treeData);
 */
