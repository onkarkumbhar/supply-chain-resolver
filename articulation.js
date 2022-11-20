class Graph2
{
	constructor(v)
	{
		this.V = v.length;
		this.cities = v;
		this.adj = new Array(v);
		this.NIL = -1;
		this.time = 0;
		this.updatedHTML2 = document.getElementById("articulation_output");
		this.maper = {};
		for(let i=0;i<this.V;i++)
		{
			this.maper[v[i]] = i;
		}
		for (let i=0; i<this.V; ++i)
			this.adj[i] = [];
	}
	addEdge(v, w)
	{
		let x = this.maper[v],y = this.maper[w];
		this.adj[x].push(y); 
		this.adj[y].push(x);
	}
	APUtil(u, visited, disc, low, parent, ap)
	{
		let children = 0;
		visited[u] = true;
		disc[u] = low[u] = ++this.time;
		for(let i of this.adj[u])
		{
			let v = i;
			if (!visited[v])
			{
				children++;
				parent[v] = u;
				this.APUtil(v, visited, disc, low, parent, ap);
				low[u] = Math.min(low[u], low[v]);
				if (parent[u] == this.NIL && children > 1)
					ap[u] = true;
				if (parent[u] != this.NIL && low[v] >= disc[u])
					ap[u] = true;
			}
			else if (v != parent[u])
				low[u] = Math.min(low[u], disc[v]);
		}
	}
	AP()
	{
		let visited = new Array(this.V);
		let disc = new Array(this.V);
		let low = new Array(this.V);
		let parent = new Array(this.V);
		let ap = new Array(this.V); 
		for (let i = 0; i < this.V; i++)
		{
			parent[i] = this.NIL;
			visited[i] = false;
			ap[i] = false;
		}
		for (let i = 0; i < this.V; i++)
			if (visited[i] == false)
				this.APUtil(i, visited, disc, low, parent, ap);

		for (let i = 0; i < this.V; i++){
			let l;
			if (ap[i] == true){
				for(let k=0;k<this.V;k++)
				{
					if(i == this.maper[this.cities[k]])
					{
						l = this.cities[k];
						break;
					}
				}
				this.updatedHTML2.innerHTML += "Articulation point => "+l+"<br>";
			}
		}
	}
}

// let g1 = new Graph(5);
// g1.addEdge(1, 0);
// g1.addEdge(0, 2);
// g1.addEdge(2, 1);
// g1.addEdge(0, 3);
// g1.addEdge(3, 4);
// g1.AP();
