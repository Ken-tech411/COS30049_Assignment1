"use client"

/**
 * Import necessary dependencies and types
 */
import type React from "react"
import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/**
 * Transaction interface defining the structure of transaction data
 * @property source - The address of the transaction sender
 * @property target - The address of the transaction recipient
 * @property amount - The amount of cryptocurrency transferred
 * @property date - The date and time of the transaction
 * @property transactionId - The unique identifier for the transaction
 */
interface Transaction {
  source: string
  target: string
  amount: number
  date: string
  transactionId: string
}

/**
 * Node interface representing a wallet address in the graph
 * @property id - The wallet address
 * @property group - Optional grouping for visual differentiation
 * @property explored - Indicates if the node has been explored in the graph
 */
interface Node {
  id: string
  group?: number
  explored?: boolean
}

/**
 * Link interface representing a transaction between two nodes
 * @property source - The source node's wallet address
 * @property target - The target node's wallet address
 * @property value - The transaction amount
 * @property direction - Indicates if the transaction is incoming or outgoing relative to the focus address
 */
interface Link {
  source: string
  target: string
  value: number
  direction: "outgoing" | "incoming"
}

/**
 * Props for the TransactionGraph component
 * @property transactions - Array of transactions to visualize
 * @property focusAddress - The main wallet address to focus on in the graph
 * @property onNodeClick - Callback function triggered when a node is clicked
 */
interface TransactionGraphProps {
  transactions: Transaction[]
  focusAddress: string
  onNodeClick: (address: string) => void
}

/**
 * TransactionGraph component
 * Renders an interactive D3 force-directed graph visualizing cryptocurrency transactions
 * @param props - The component props of type TransactionGraphProps
 * @returns A React functional component
 */
const TransactionGraph: React.FC<TransactionGraphProps> = ({ transactions, focusAddress, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [exploredNodes, setExploredNodes] = useState<Set<string>>(new Set([focusAddress]))

  useEffect(() => {
    setExploredNodes(new Set([focusAddress]))
  }, [focusAddress])

  useEffect(() => {
    if (!svgRef.current || transactions.length === 0) return

    const svg = d3.select(svgRef.current)
    const width = 800
    const height = 600

    svg.selectAll("*").remove()
    svg.attr("width", width).attr("height", height)

    // Get all connected nodes for the explored nodes
    const getConnectedNodes = (address: string): string[] => {
      return transactions
        .filter((t) => t.source === address || t.target === address)
        .map((t) => (t.source === address ? t.target : t.source))
    }

    // Create nodes and links based on explored nodes and their connections
    const nodes: Node[] = [
      ...new Set([...exploredNodes].flatMap((address) => [address, ...getConnectedNodes(address)])),
    ].map((id) => ({ id }))

    // Process transactions to create directional links
    const links: Link[] = transactions
      .filter((t) => nodes.some((n) => n.id === t.source) && nodes.some((n) => n.id === t.target))
      .map((t) => ({
        source: t.source,
        target: t.target,
        value: t.amount,
        direction: t.source === focusAddress ? "outgoing" : "incoming",
      }))

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(200), // Increased distance to accommodate labels
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))

    // Create arrow markers for links
    svg
      .append("defs")
      .selectAll("marker")
      .data(["outgoing", "incoming"])
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5")

    // Create container for zoom
    const container = svg
      .append("g")
      .attr("class", "container")
      .call(
        d3.zoom().on("zoom", (event) => {
          container.attr("transform", event.transform)
        }) as any,
      )

    // Create links with arrows
    const link = container
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value))
      .attr("marker-end", (d) => `url(#arrow-${d.direction})`)

    // Add text labels for transaction amounts
    const linkLabels = container.append("g").selectAll("g").data(links).join("g").attr("class", "link-label")

    // Add "To:" labels above links for outgoing transactions
    linkLabels
      .filter((d) => d.direction === "outgoing")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -8)
      .attr("fill", "#fff")
      .style("font-size", "12px")
      .text((d) => `Send: ${d.value} ETH`)

    // Add "From:" labels below links for incoming transactions
    linkLabels
      .filter((d) => d.direction === "incoming")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 16)
      .attr("fill", "#fff")
      .style("font-size", "12px")
      .text((d) => `Receive: ${d.value} ETH`)

    // Create nodes
    const node = container
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .call(d3.drag<any, any>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", (d) => (d.id === focusAddress ? 15 : 10))
      .attr("fill", (d) => {
        if (d.id === focusAddress) return "#4ade80"
        if (d.explored) return "#60a5fa"
        return "#9ca3af"
      })
      .attr("cursor", "pointer")
      .on("click", handleNodeClick)
      .on("mouseover", function () {
        d3.select(this).attr("r", (d: any) => (d.id === focusAddress ? 18 : 12))
      })
      .on("mouseout", function () {
        d3.select(this).attr("r", (d: any) => (d.id === focusAddress ? 15 : 10))
      })

    // Add labels to nodes
    node
      .append("text")
      .text((d) => `${d.id.substring(0, 6)}...${d.id.slice(-4)}`)
      .attr("x", 12)
      .attr("y", 4)
      .style("font-size", "12px")
      .style("fill", "#fff")
      .style("cursor", "pointer")
      .on("click", handleNodeClick)

    // Add tooltips
    node.append("title").text((d) => d.id)

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)

      // Update link label positions
      linkLabels.attr("transform", (d: any) => {
        const x = (d.source.x + d.target.x) / 2
        const y = (d.source.y + d.target.y) / 2
        return `translate(${x},${y})`
      })
    })

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    // Node click handler
    function handleNodeClick(event: any, d: Node) {
      event.stopPropagation()
      setSelectedNode(d.id)
      setExploredNodes((prev) => new Set([...prev, d.id]))
      onNodeClick(d.id)
    }

    return () => {
      simulation.stop()
    }
  }, [transactions, focusAddress, exploredNodes, onNodeClick])

  return (
    <div className="space-y-4">
      <svg ref={svgRef} className="w-full fade-in"></svg>
    </div>
  )
}

/**
 * Export the TransactionGraph component as the default export
 */
export default TransactionGraph

