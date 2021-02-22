import Loading from './Loading.js'
import ImageView from './ImageView.js'
import Breadcrumb from './Breadcrumb.js'
import Nodes from './Nodes.js'
import { request } from './api.js'

const cache = {}

export default function App({ $app, onError }) {
  $app.innerHTML = ''

  this.onError = onError

  this.state = {
    isLoading: false,
    isRoot: false,
    selectedNodeImage: null,
    depth: [],
    nodes: []
  }

  const loading = new Loading({
    $app,
    initialState: false
  })

  const imageView = new ImageView({
    $app,
    initialState: null,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedNodeImage: null
      })
    }
  })

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: [],
    onClick: (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          depth: [],
          nodes: cache.root
        })
        return
      }

      // Note: breadcrumb에서 현재 위치를 누른 경우는 무시함
      if (index === this.state.depth.length - 1) {
        return
      }

      const nextState = { ...this.state }
      const nextDepth = this.state.depth.slice(0, index + 1)

      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id]
      })
    }
  })

  const nodes = new Nodes({
    $app,
    initialState: [],
    onBack: async () => {
      try {
        const nextState = {...this.state}
        nextState.depth.pop()

        const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id

        if (prevNodeId === null) {
          this.setState({
            ...this.state,
            isRoot: prevNodeId === null,
            nodes: cache.root
          })
          return
        }
        if (cache[prevNodeId]) {
          this.setState({
            ...this.state,
            isRoot: prevNodeId === null,
            nodes: cache[prevNodeId]
          })
          return
        }

        this.setState({
          ...this.state,
          isLoading: true
        })
        const prevNodes = await request(prevNodeId)

        this.setState({
          ...this.state,
          isRoot: prevNodeId === null,
          nodes: prevNodes,
          isLoading: false
        })
      } catch(e) {
        this.onError(e)
      }
    },
    onSelect: async (node) => {
      try {
        if (node.type === 'DIRECTORY') {
          if (cache[node.id]) {
            this.setState({
              ...this.state,
              isLoading: false,
              depth: [...this.state.depth, node],
              nodes: cache[node.id]
            })
          } else {
            this.setState({
              ...this.state,
              isLoading: true
            })

            const nextNodes = await request(node.id)
            this.setState({
              ...this.state,
              isLoading: false,
              depth: [...this.state.depth, node],
              nodes: nextNodes
            })

            cache[node.id] = nextNodes
          }
        } else if (node.type === 'FILE') {
          this.setState({
            ...this.state,
            selectedNodeImage: `http://localhost:4000/static${node.filePath}`
          })
        }
      } catch(e) {
        this.onError(e)
      }
    }
  })

  this.setState = (nextState) => {
    this.state = nextState

    loading.setState(this.state.isLoading)
    imageView.setState(this.state.selectedNodeImage)
    breadcrumb.setState(this.state.depth)
    nodes.setState({
      isRoot: this.state.depth.length === 0,
      nodes: this.state.nodes
    })
  }


  const init = async () => {
    this.setState({
      ...this.state,
      isLoading: true
    })

    try {
      const rootNodes = await request()
      this.setState({
        ...this.state,
        isLoading: false,
        isRoot: true,
        nodes: rootNodes
      })
      cache.root = rootNodes

    } catch(e) {
      this.onError(e)
    }
  }

  init()
}