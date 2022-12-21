/**
 * SHG - Spatial Hash Grid
 */
export default class SHG<ID> {
    #cells: Map<number, Set<ID>> = new Map<number, Set<ID>>();
    #hashes: Map<ID, number> = new Map<ID, number>();
    #data = { cs: 1, cx: 1, cy: 1 };
    /**
     * @param w width of grid
     * @param h height of grid
     * @param cs cellSize
     */
    constructor(w: number, h: number, cs: number) {
        this.#data.cs = cs;
        this.#data.cx = Math.floor(w / cs) + 1;
        this.#data.cy = Math.floor(h / cs) + 1;

        for (let y = 0; y < this.#data.cy; y++) {
            for (let x = 0; x < this.#data.cx; x++) {
                this.#cells.set(this.#getCellHash(x, y), new Set<ID>());
            }
        }
    }
    set(id: ID, x: number, y: number) {
        const [cx, cy] = this.#getCellPos(x, y);
        const hash = this.#getCellHash(cx, cy);
        this.#setInner(id, hash);
    }
    #setInner(id: ID, hash: number) {
        this.#cells.get(hash)?.add(id);
        this.#hashes.set(id, hash);
    }
    delete(id: ID) {
        const hash = this.#hashes.get(id);
        if (hash === undefined)
            return;
        this.#cells.get(hash)?.delete(id);
        this.#hashes.delete(id);
    }
    update(id: ID, x: number, y: number) {
        const ph = this.#hashes.get(id);
        if (ph === undefined)
            return;
        const [nx, ny] = this.#getCellPos(x, y);
        const nh = this.#getCellHash(nx, ny);
        if (nh == ph)
            return;
        this.delete(id);
        this.#setInner(id, nh);
    }
    /**
     * @param x 
     * @param y 
     * @param range 
     * @returns list of ids in range
     */
    query(x: number, y: number, range: number): ID[] {
        const [sx, sy] = this.#getCellPos(x - range, y - range);
        const [ex, ey] = this.#getCellPos(x + range, y + range);

        const ids: ID[] = [];
        for (let cy = sy; cy <= ey; cy++) {
            for (let cx = sx; cx <= ex; cx++) {
                const cell = this.#cells.get(this.#getCellHash(cx, cy));
                if (cell)
                    ids.push(...cell);
            }
        }
        return ids;
    }
    #getCellHash(x: number, y: number) {
        return y * this.#data.cx + x;
    }
    #getCellPos(x: number, y: number): [number, number] {
        const cx = this.#clamp(Math.floor(x / this.#data.cs), this.#data.cx - 1);
        const cy = this.#clamp(Math.floor(y / this.#data.cs), this.#data.cy - 1);
        return [cx, cy];
    }
    #clamp(n: number, max: number) { return Math.max(0, Math.min(n, max)) }
}