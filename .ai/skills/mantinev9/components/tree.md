### tree
Tree displays hierarchical data with expand/collapse, selection, checkbox, and drag-and-drop support, controlled via the useTree hook
[tree docs](https://mantine.dev/core/tree/)
#### Import
`import { Tree, useTree } from '@mantine/core';`
#### Components
- component: `Tree`
- hook: `useTree`
- helper utilities: `getTreeExpandedState`, `filterTreeData`, `mergeAsyncChildren`, `moveTreeNode`, `flattenTreeData`, `defaultTreeNodeFilter`
- virtualization helper: `FlatTreeNode`
#### Key props (Tree)
- `data`: `TreeNodeData[]` (required) — array of `{ value, label, children?, hasChildren? }`; `value` must be unique across the whole tree, `data` must be a stable/memoized reference
- `tree`: return value of `useTree()` — pass to control expanded/selected/checked state
- `renderNode`: `(payload: RenderTreeNodePayload) => ReactNode` — customize node rendering; payload includes `node`, `expanded`, `hasChildren`, `selected`, `isLoading`, `loadError`, `tree`, `elementProps`, `dragHandleProps`
- `levelOffset`: MantineSpacing — horizontal padding per nesting level
- `expandOnClick` / `expandOnSpace`: boolean — expand on click / space key
- `selectOnClick`: boolean — select node on click
- `checkOnSpace`: boolean — check node on space key
- `clearSelectionOnOutsideClick`: boolean
- `withLines`: boolean — render connecting lines between parent/child nodes
- `withDragHandle`: boolean — restrict drag start to the element spreading `dragHandleProps`
- `onDragDrop`: `(payload: TreeDragDropPayload) => void` — required to enable drag-and-drop; payload has `draggedNode`, `targetNode`, `position` (`'before' | 'after' | 'inside'`)
- `allowDrop`: `(payload) => boolean` — return `false` to reject a specific drop
- `keepMounted`: boolean — keep collapsed subtree content mounted
#### useTree(options) key options / returns
- options: `initialExpandedState`, `expandedState`/`onExpandedStateChange` (controlled), `initialSelectedState`, `selectedState`/`onSelectedStateChange`, `initialCheckedState`, `checkedState`/`onCheckedStateChange`, `multiple`, `checkStrictly` (independent parent/child checkboxes), `onNodeExpand`, `onNodeCollapse`, `onLoadChildren` (async lazy loading)
- returns: `expandAllNodes()`, `collapseAllNodes()`, `toggleExpanded(value)`, `expand(value)`, `collapse(value)`, `select(value)`, `deselect(value)`, `toggleSelected(value)`, `clearSelected()`, `checkNode(value)`, `uncheckNode(value)`, `checkAllNodes()`, `uncheckAllNodes()`, `isNodeChecked(value)`, `isNodeIndeterminate(value)`, `getCheckedNodes()`, `loadNode(value)`, `invalidateNode(value)`
#### Syntax
```tsx
const tree = useTree({
  initialExpandedState: getTreeExpandedState(data, '*'),
});

<Tree
  data={data}
  tree={tree}
  withLines
  renderNode={({ node, expanded, hasChildren, elementProps }) => (
    <Group gap={5} {...elementProps}>
      {hasChildren && <CaretIcon style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />}
      <span>{node.label}</span>
    </Group>
  )}
/>
```
#### Rules
- Every node's `value` must be unique across the entire tree, including across different branches — duplicate values break selection/expansion tracking
- `data` must be a stable/memoized reference; recreating it on every render defeats the tree's internal diffing
- Checking a parent by default cascades to all children and vice versa; set `checkStrictly: true` on `useTree` to make each node's checked state fully independent (in this mode `isNodeIndeterminate` always returns `false`)
- Lazy-loaded branches use `hasChildren: true` with no `children` array; implement `onLoadChildren` on `useTree` and merge results back into `data` with `mergeAsyncChildren`
- `Tree` has no built-in search UI — build search/filter externally using `filterTreeData` (to hide non-matching branches) or by highlighting matches inside a custom `renderNode` (keep all nodes, auto-expand ancestors with `getTreeExpandedState`)
- Drag-and-drop is opt-in: it only activates when `onDragDrop` is provided; use `moveTreeNode` to apply the result to `data`, and `allowDrop` to forbid specific drop targets (e.g. a node onto its own descendant)
- For large trees, `Tree` does not virtualize internally — use `flattenTreeData` + `FlatTreeNode` with a virtualizer (e.g. `@tanstack/react-virtual`), and give the scroll container `data-tree-root` and `role="tree"` for keyboard navigation to keep working
