function uploadCSV(file){
  const r=new FileReader();
  r.onload=e=>{
    const rows=e.target.result.split("\n");
    rows.forEach(row=>{
      const [en,name,dep,sem]=row.split(",");
      db.collection("users").doc(en).set({
        enrollment:en,name,department:dep,semester:sem,role:"student"
      });
    });
    alert("Uploaded");
  };
  r.readAsText(file);
}