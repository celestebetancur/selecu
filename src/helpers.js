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

export {shuffle};
