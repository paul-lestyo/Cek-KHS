let URL_KHS = "https://siakad.uns.ac.id/services/v1/nilai/khs?"
let DataKHS = [];
const addNewModal = (KHSSemester = []) => {
	const modal = document.createElement('div');
	modal.classList.add('modal', 'show');
	let tbody = ``;

	for (let i = 0; i < KHSSemester.length; i++) {
		tbody += `
			<tr>
				<td class="text-center">
					${i+1}
				</td>
				<td class="text-center">
					${KHSSemester[i].nama_mata_kuliah}
				</td>
				<td class="text-center">
					${KHSSemester[i].sks}
				</td>
				<td class="text-center">
					${KHSSemester[i].kelas}
				</td>
				<td class="text-center">
					${KHSSemester[i].nilai_tugas}
				</td>
				<td class="text-center">
					${KHSSemester[i].nilai_kuis}
				</td>
				<td class="text-center">
					${KHSSemester[i].nilai_mid}
				</td>
				<td class="text-center">
					${KHSSemester[i].nilai_praktik}
				</td>
				<td class="text-center">
					${KHSSemester[i].nilai_uas}
				</td>
				<td class="text-center">
					${KHSSemester[i].nilai_akhir}
				</td>
				<td class="text-center">
					${KHSSemester[i].nilai_huruf}
				</td>
			</tr>
		`;
		
	}	

	modal.innerHTML += `
	<div class="modal-dialog modal-lg" id="modal-inject" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Nilai KHS</h5>
        <button type="button" class="close exit" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
	  <table class="table table-striped table-bordered">
	  <thead>
		  <tr>
			  <td>
				  <b>No</b>
			  </td>
			  <td>
				  <b>Mata Kuliah</b>
			  </td>
			  <td>
				  <b>Jumlah SKS</b>
			  </td>
			  <td>
				  <b>Kelas</b>
			  </td>
			  <td>
				  <b>Nilai Tugas</b>
			  </td>
			  <td>
				  <b>Nilai Kuis</b>
			  </td>
			  <td>
				  <b>Nilai Mid</b>
			  </td>
			  <td>
				  <b>Nilai Praktik</b>
			  </td>
			  <td>
				  <b>Nilai UAS</b>
			  </td>
			  <td>
				  <b>Nilai Angka</b>
			  </td>
			  <td>
				  <b>Nilai Huruf</b>
			  </td>
		  </tr>
	  </thead>
	  <tbody>
		${tbody}
	  </tbody>
  </table>
      </div>
      <div class="modal-footer">
		<button type="button" class="btn btn-danger exit">Close</button>
      </div>
    </div>
  </div>`;
	// modal.appendChild(modalContent);

	modal.querySelectorAll('.exit').forEach((element) => {
		element.addEventListener('click', () => { modal.remove(); });
	})
	document.body.appendChild(modal);
};

const getDataKHS = async (tahun, semester) => {
	let headers = new Headers()
	headers.append('Authorization', 'Bearer ' + JWT_TOKEN)
	const response = await fetch(`${URL_KHS}tahun=${tahun}&semester=${semester}`, {
		method: 'POST',
		headers
	})

	const KHS = await response.json();
	return KHS;
}


content = document.getElementById('content')
newDiv = document.createElement('div')

content.appendChild(newDiv)

newDiv.innerHTML += `
<div class="panel panel-info" data-select2-id="6" >
<div class="panel-heading">
	<i class="glyphicon glyphicon-search"></i> Cek KHS by ℗

</div>
<div class="panel-body" data-select2-id="5" >
	<div class="clearfix">
		<h3>Cek Nilai KHS per Semester</h3>

	</div>

	<div class="konsultasi collapse in" style="margin-top: 15px;">
		<form id="form" onsubmit="return false;" method="get" data-select2-id="w1" >
			<div class="row" data-select2-id="4" >
				<div class="col-sm-6">
					<div class="form-group field-bimbinganakademiksearch-tahun">
						<label class="control-label" >Tahun</label>
						<input type="number" class="form-control" name="tahun" placeholder="Masukkan Tahun yang ingin dicari..." min="2017" value="2021" >

						<div class="help-block"></div>
					</div>
				</div>
				<div class="col-sm-6">
				<label class="control-label" >Semester</label>
					<select name="semester" class="form-control" id="exampleFormControlSelect1">
						<option value="A">Ganjil</option>
						<option value="B" selected>Genap</option>
					  </select>
				</div>
			</div>
			<div class="form-group">
				<button onclick="searchKHS()" class="btn btn-primary submit" ><i class="fa fa-search"></i> Cari</button>
			</div>
		</form>
	</div>
</div>
</div>


`;

const searchKHS = async () => {
	dataForm = {};

	const form = document.getElementById('form');
	[...form.elements].forEach((item) => {
		dataForm[item.name] = item.value;
	  });


	const KHSSemester = await getDataKHS(dataForm.tahun, dataForm.semester);
	addNewModal(KHSSemester.data);
	return false;
};
