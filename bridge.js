class Graph
{
	constructor(v)
	{
		this.V = v.length;
		this.updatedHTML1 = document.getElementById("bridge_output");
		this.cities = v;
		this.adj = new Array(v);
		this.maper = {};
		for(let i=0;i<this.V;i++)
		{
			this.maper[v[i]] = i;
		}
		this.NIL = -1;
		this.time = 0;
		for (let i=0; i<v.length; ++i)
			this.adj[i] = new Array();
	}
	
	addEdge(v,w)
	{
		let x = this.maper[v],y = this.maper[w];
		// console.log("addedge"+x+" "+y+" ");
		this.adj[x].push(y);
		this.adj[y].push(x);
	}

	// Bridges

	bridgeUtil(u,visited,disc,low,parent)
	{
		visited[u] = true;
		disc[u] = low[u] = ++this.time;
		for(let i of this.adj[u])
		{
			let v = i;
			if (!visited[v])
			{
				parent[v] = u;
				this.bridgeUtil(v, visited, disc, low, parent);
				low[u] = Math.min(low[u], low[v]);
				if (low[v] > disc[u])
				{
					let v1,u1;
					for(let i=0;i<this.V;i++)
					{
						if(u == this.maper[this.cities[i]])
						{
							u1 = this.cities[i];
						}
						if(v == this.maper[this.cities[i]])
						{
							v1 = this.cities[i];
						}
					}
					this.updatedHTML1.innerHTML += u1+" => "+v1+"<br>";
				}
			}
			else if (v != parent[u])
				low[u] = Math.min(low[u], disc[v]);
		}
	}
	bridge()
	{
		// console.log(this.adj);
		let visited = new Array(this.V);
		let disc = new Array(this.V);
		let low = new Array(this.V);
		let parent = new Array(this.V);
		for (let i = 0; i < this.V; i++)
		{
			parent[i] = this.NIL;
			visited[i] = false;
		}
		for (let i = 0; i < this.V; i++)
			if (visited[i] == false)
				this.bridgeUtil(i, visited, disc, low, parent);
	}
}

