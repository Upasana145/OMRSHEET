

import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { createData, getData } from "../../redux/slices/apiSlice";
import { toast } from "react-toastify";

const Add = () => {
    const dispatch = useDispatch();
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);
    const [isSubmiting, setIsSubmiting] = useState(false);

    const [formData, setFormData] = useState({
        template: {},
        batch_name: null,
    });
    const [templateOptions, setTemplateOptions] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const action = await dispatch(getData({ indicatorPath: '/templates' }));
            if (getData.fulfilled.match(action)) {
                setTemplateOptions(action.payload.results.map((item) => ({
                    value: item?.template_id,
                    label: `${item?.template_name}`,
                })));
            } else {
                console.log('action', action)
                toast.error('Unable to fetch templates. Please try again.');
            }
        }
        fetchData();
    }, [])


    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    };
    const InputChange = (e) => {
        // --For Multiple File Input
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: generateRandomId(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            filesize: filesizes(e.target.files[i].size)
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }


    const DeleteSelectFile = (id) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = selectedfile.filter((data) => data.id !== id);
            SetSelectedFile(result);
        } else {
            // alert('No');
        }

    }

    const FileUploadSubmit = async (e) => {
        e.preventDefault();
        if (!formData.template.value) {
            toast.error('Please select template. Please try again.');
            return;
        }

        if (!formData.batch_name) {
            toast.error('Please enter batach name. Please try again.');
            return;
        }
        if (!selectedfile.length > 0) {
            toast.error('At least one file required. Please try again.');
            return;
        }
        // form reset on submit 
        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        selectedfile[index]
                    ]
                })
            } 
            const uploadData = selectedfile.map((fileObj) => ({
                fileName: fileObj.filename,
                fileType: fileObj.filetype,
                fileSize: fileObj.filesize,
                base64: fileObj.fileimage
            }));



            try {
                setIsSubmiting(true)
                const payload = {
                    template_id: formData.template.value,
                    batch_name: formData.batch_name,
                    files: uploadData
                };
                const headers = {
                    'Content-Type': 'multipart/form-data'
                };

                const action = await dispatch(createData({ indicatorPath: '/omr/upload', payload, headers }));
                if (createData.fulfilled.match(action)) {
                    toast.success(action.payload.message);
                    SetSelectedFile([]);
                    SetFiles([]);
                    setIsSubmiting(false)
                } else {
                    toast.error('File upload failed. Please try again.');
                }
            } catch (error) {
                console.error('File upload failed:', error);
                toast.error('File upload failed. Please try again.');
            } finally {
                setIsSubmiting(false)
            }
        } else {
            toast.warning('Please select file');
        }
    }


    const DeleteFile = async (id) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = Files.filter((data) => data.id !== id);
            SetFiles(result);
        } else {
            alert('No');
        }
    }

    const handleChangeInput = useCallback((e, field) => {
        const { value } = e.target;
        setFormData({ ...formData, [field]: value, });
    }, [formData, setFormData]);

    const handleOnChangeParentInput = useCallback((e, field) => {
        setFormData(prevData => {
            const updatedData = { ...prevData, [field]: e };
            return updatedData;
        });
    }, [setFormData]);


    return (

        <div className="fileupload-view">
            <div className="row justify-content-center m-0">
                <div className="col-md-12">
                    <div className="card mt-5">
                        <div className="card-body">
                            <div className="kb-data-box">
                                <div className="kb-modal-data-title">
                                    <div className="kb-data-title">
                                        <h6>Upload OMR Sheet</h6>
                                    </div>
                                </div>
                                <form onSubmit={FileUploadSubmit}>

                                    <div className="row">
                                        <div className="form-group col-md-6  ">
                                            <div className="col-sm-4 col-4">
                                                <label htmlFor='template_id' className="mr-3 pe-7">
                                                    Select Template Name
                                                </label>
                                            </div>
                                            <div className="col-sm-9 col-8">
                                                <Select
                                                    className="custome-input-height wide-input5 custome-border"
                                                    id="template_name"
                                                    name="template_name"
                                                    options={[{ label: "Select Template", value: null }, ...templateOptions]}
                                                    onChange={(selectedOption) => handleOnChangeParentInput(selectedOption, 'template')}
                                                    value={formData.template || { label: "Select Template", value: null }}

                                                />

                                            </div>
                                        </div>

                                        <div className="form-group col-md-6  ">
                                            <div className="col-sm-3 col-4">
                                                <label htmlFor='batch_name' className="mr-3 pe-7">
                                                    Batch Name
                                                </label>
                                            </div>
                                            <div className="col-sm-9 col-8">
                                                <input
                                                    type="text"
                                                    onChange={(e) => handleChangeInput(e, 'batch_name')}
                                                    className="form-control"
                                                    name="batch_name"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group col-md-6 mt-5">
                                            <div className="col-sm-4 col-4">
                                                <label htmlFor='batch_name' className="mr-3 pe-7">
                                                    Select OMR Files
                                                </label>
                                            </div>
                                            <div className="kb-file-upload">
                                                <div className="file-upload-box">
                                                    <input type="file" name="omr_files" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                                                    <span>Drag and drop or <span className="file-link">Choose your OMR files</span></span>
                                                </div>
                                            </div>
                                            <div className="kb-attach-box mb-3">
                                                {
                                                    selectedfile.map((data, index) => {
                                                        const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                        return (
                                                            <div className="file-atc-box" key={id}>
                                                                {
                                                                    filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                        <div className="file-image" style={{width:'150px',height:'200px'}}> <img src={fileimage} alt="" /></div> :
                                                                        <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                                }
                                                                <div className="file-detail">
                                                                    <h6>{filename}</h6>
                                                                    <p></p>
                                                                    <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p>
                                                                    <div className="file-actions">
                                                                        <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        </div>
                                        <div className="form-group col-md-6 mt-5">
                                            <div className="kb-buttons-box">
                                                <button type="submit" className={`btn ${isSubmiting ? 'btn-success' : 'btn-primary'} form-submit`} disabled={isSubmiting}>{isSubmiting ? 'Uploading...' : 'Sumbit'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {Files.length > 0 ?
                                    <div className="kb-attach-box">
                                        <hr />
                                        {
                                            Files.map((data, index) => {
                                                const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                return (
                                                    <div className="file-atc-box" key={index}>
                                                        {
                                                            filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                        }
                                                        <div className="file-detail">
                                                            <h6>{filename}</h6>
                                                            <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                                                            <div className="file-actions">
                                                                <button className="file-action-btn" onClick={() => DeleteFile(id)}>Delete</button>
                                                                <a href={fileimage} className="file-action-btn" download={filename}>Download</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Add;