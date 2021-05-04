const shuffle = (toShuffle) => {
 let sorted= [];
 let size = toShuffle.length;
 for(let i = 0; i < size; i++){
   let c = Math.floor(Math.random() * toShuffle.length);
   sorted.push(toShuffle[c]);
   toShuffle.splice(c,1);
 }
 return sorted;
}

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

export {shuffle, map};
