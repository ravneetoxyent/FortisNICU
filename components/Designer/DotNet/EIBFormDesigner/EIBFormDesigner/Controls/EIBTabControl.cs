using System.ComponentModel;
using System.Collections.Generic;
using System.Text;
using System.Windows.Forms;
using System.Drawing;
using System.Collections;
using System.Globalization;
using System.Reflection;
using System.Runtime.Serialization;
using System.Security.Permissions;
using System.Xml;
using EIBFormDesigner.XML;
using System.Drawing.Design;
using EIBFormDesigner.Designer;
using EIBFormDesigner.Controls.Common;

namespace EIBFormDesigner.Controls
{
    public class EIBTabControl : EIBTabControlBase
    {
    }
    public class EIBTabControlBase : TabControl, ITool, IEIBControl, ICustomSizableControl
    {
        private string defaultValue;
        private string onClickValue;
        private string onDoubleClick;
        private string enteringValue;
        private string exitingValue;
        private string isMandatory;
        private string isForm;
        private string dataPatternName;
        private string dataTableName;
        private string dataFieldName;
        /// <summary>
        /// /
        /// 
        /// </summary>
        private string onEventCreateValue;
        private string onEventEditValue;
        private string onEventUpdateValue;
        public string OnEventCreateValue
        {
            get
            {
                return onEventCreateValue;
            }
            set
            {
                onEventCreateValue = value;
            }
        }

        public string OnEventEditValue
        {
            get
            {
                return onEventEditValue;
            }
            set
            {
                onEventEditValue = value;
            }
        }
        public string OnEventUpdateValue
        {
            get
            {
                return onEventUpdateValue;
            }
            set
            {
                onEventUpdateValue = value;
            }
        }
        private string onChangeValue;
        public string OnChange
        {
            get
            {
                return onChangeValue;
            }
            set
            {
                onChangeValue = value;
            }
        }
        private string onOKValue;
        public string OnOK
        {
            get
            {
                return onOKValue;
            }
            set
            {
                onOKValue = value;
            }
        }
        private List<DataMapping> dataMappings;

        [Browsable(true), Description("Set DataMappings"), Category("Data"),
        EditorAttribute(typeof(DataMappingEditor), typeof(UITypeEditor)),
        TypeConverter(typeof(DataMappingConverter))
        ]
        public List<DataMapping> DataMappings
        {
            get { return dataMappings; }
            set { dataMappings = value; }
        }

        bool draggable;[Browsable(true), DesignerSerializationVisibility(DesignerSerializationVisibility.Content), Description("Sets the Draggable property of control"), Category("Appearance")]
        public bool Draggable
        {
            get
            {
                return draggable;
            }
            set
            {
                draggable = value;
            }
        }

        bool droppable;[Browsable(true), DesignerSerializationVisibility(DesignerSerializationVisibility.Content), Description("Sets the Draggable property of control"), Category("Appearance")]
        public bool Droppable
        {
            get
            {
                return droppable;
            }
            set
            {
                droppable = value;
            }
        }

        ControlPosition position;
        [Browsable(true), DesignerSerializationVisibility(DesignerSerializationVisibility.Content), Description("Sets the Position of the Control"), Category("Appearance")]
        public ControlPosition Position
        {
            get
            {
                return position;
            }
            set
            {
                position = value;
            }
        }

        private Padding controlMargin = new Padding(0);[DisplayName("Margin"), Browsable(true), Category("Data"), Description("Set the Margin of a control.") ] public Padding ControlMargin { get { return controlMargin; } set { controlMargin = value; } } [Browsable(false)] public new Padding Margin { get { return base.Margin; } set { base.Margin = value; } } string use;
        [Browsable(true), DefaultValue(""), DesignerSerializationVisibility(DesignerSerializationVisibility.Content), Description("Sets the User defined class for control"), Category("Appearance")]
        public string Use
        {
            get
            {
                return use;
            }
            set
            {
                use = value;
            }
        }

        [Browsable(false)]
        public override DockStyle Dock
        {
            get
            {
                return base.Dock;
            }
            set
            {
                base.Dock = value;
            }
        }

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content),
      TypeConverter(typeof(EIBFormDesigner.Property.IsMandatory)), Description("Sets the mandatory field"), Category("Data")]

        public string IsMandatory
        {
            get
            {

                return isMandatory;
            }
            set
            {

                isMandatory = value;

            }
        }

        [DesignerSerializationVisibility(DesignerSerializationVisibility.Content),
  TypeConverter(typeof(EIBFormDesigner.Property.IsForm)), Description("Sets the Form Status"), Category("Data")]

        public string IsForm
        {
            get
            {

                return isForm;
            }
            set
            {

                isForm = value;

            }
        }

        public string DefaultValue
        {
            get
            {
                return defaultValue;
            }
            set
            {
                defaultValue = value;
            }
        }
        public string OnClickValue
        {
            get
            {
                return onClickValue;
            }
            set
            {
                onClickValue = value;
            }
        }

        new public string OnDoubleClick
        {
            get
            {
                return onDoubleClick;
            }
            set
            {
                onDoubleClick = value;
            }
        }

        public string EnteringValue
        {
            get
            {
                return enteringValue;
            }
            set
            {
                enteringValue = value;
            }
        }

        public string ExitingValue
        {
            get
            {
                return exitingValue;
            }
            set
            {
                exitingValue = value;
            }
        }

        private bool visible = true;public bool getVisibility() { return visible;}[Browsable(true)] public new bool Visible { get { return base.Visible; } set { visible = value; base.Visible = value; } }  private List<string> visibleTo =new List<string>(new string[] { "All"});[Browsable(true), Description("Set VisibleTo property for the control"), Category("Data"),EditorAttribute(typeof(VisibleToEditor), typeof(UITypeEditor)),TypeConverter(typeof(VisibleToConverter))] public List<string> VisibleTo{get { return visibleTo; } set { visibleTo = value; }} private string onFocus; public string OnFocus { get { return onFocus; } set { onFocus = value; } } private string onBlur; public string OnBlur { get { return onBlur; } set { onBlur = value; } } private string onDrop;
        public string OnDrop
        {
            get
            {
                return onDrop;
            }
            set
            {
                onDrop = value;
            }
        }

        private XmlNode parentXmlNode;
        public XmlNode ParentXmlNode
        {
            get
            {
                return parentXmlNode;
            }
            set
            {
                parentXmlNode = value;
            }
        }

        /// <summary>
        /// this is uniqueid property as readonly.
        /// </summary>
        private string uniqueId;
        [Browsable(true), DefaultValue(false), EditorBrowsable(EditorBrowsableState.Never), Description("Get the unique id of control"), Category("Appearance")]
        public string UniqueId
        {
            get
            {
                return uniqueId;
            }
            set
            {
                if (this.uniqueId == null)// 
                {
                    string retVal = ControlValidation.validateUniqueId(value);
                    if (retVal.Length > 0)
                    {
                        MessageBox.Show(retVal);
                    }
                    else
                    {
                        uniqueId = value;
                    }

                }
                else if (this.uniqueId != value && ControlValidation.doesUniqueIdExist(value))
                {
                    MessageBox.Show("Control with same UniqueId already exist");
                    return;
                }
                if (!(uniqueId == null))
                {
                    string retVal = ControlValidation.validateUniqueId(value);
                    if (retVal.Length > 0)
                    {
                        MessageBox.Show(retVal);
                    }
                    else
                    {
                        uniqueId = value;
                    }
                }
            }
        }

        private string controlName;
        [Browsable(true), EditorBrowsable(EditorBrowsableState.Never), Description("Sets the name of control"), Category("Appearance")]
        public string ControlName
        {
            get
            {
                return controlName;
            }
            set
            {
                if (!(controlName == null))
                {
                    if (value.Contains(" "))
                    {
                        MessageBox.Show("Please remove blanks from control name");
                    }
                    else if (value == "" || value == null)
                    {
                        MessageBox.Show("Control name can not be null");
                    }
                    else
                    {
                        controlName = value;
                        //this.Name = value;
                    }
                }
                else
                {
                    controlName = value;
                    //this.Name = value;
                }
            }
        }

        internal static int counter = 0;
        int width = 150;
        int height = 150;
        public EIBTabControlBase()
        {
            if (string.IsNullOrEmpty(this.Name))
            {
                this.Name = "multitab" + counter;
            }
            if (string.IsNullOrEmpty(this.ControlName))
            {
                this.ControlName = this.Name;
            }
            this.Text = "multitab";
            this.Margin = new Padding(0, 0, 0, 0);
            this.Layout += new LayoutEventHandler(Control_Layout);
            this.SizeChanged += new System.EventHandler(Control_SizeChanged);
        }
        public void InitiateSettings(EIBFormDesigner.Designer.FormDesigner form)
        {
            EIBTabPage tabPage1 = new EIBTabPage();
            tabPage1.InitiateSettings(null);
            EIBTabPage tabPage2 = new EIBTabPage();
            tabPage2.InitiateSettings(null);
            tabPage1.Text = tabPage1.Name;
            tabPage2.Text = tabPage2.Name;
            this.Controls.Add(tabPage1);
            this.Controls.Add(tabPage2);
            this.Size = new Size(width, height);
            this.Name = EIBControlCollection.CheckControlForUniqueness<EIBTabControl>(this.Name);
            if (string.IsNullOrEmpty(this.ControlName))
            {
                this.ControlName = this.Name;
            }
            if (string.IsNullOrEmpty(this.UniqueId))
            {
                this.UniqueId = this.Name;
            }
            if (this.Text == null)
            {
                this.Text = this.Name;
            }
            EIBControlCollection.TabControllist.Add(this.Name, this.Name);

            //EIBTabPage tabPage1 = new EIBTabPage();
            //EIBTabPage tabPage2 = new EIBTabPage();
            //tabPage1.InitiateSettings(null);
            //tabPage2.InitiateSettings(null);
            //tabPage1.Text = "tabPage1";
            //tabPage2.Text = "tabPage2";
            //this.Controls.Add(tabPage1);
            //this.Controls.Add(tabPage2);
            //this.Size = new Size(width, height);
            //this.Name = "tabControl" + counter;
            //this.ControlName = this.Name;
            //this.Margin = new Padding(0, 0, 0, 0);
            //this.Text = "tabControl" + counter.ToString();
            //counter++;
        }
        public void InitiateSettingsWithNoChild()
        {
            this.Size = new Size(width, height);
            if (string.IsNullOrEmpty(this.Name))
            {
                this.Name = "tabControl" + counter;
            }
            if (string.IsNullOrEmpty(this.ControlName))
            {
                this.ControlName = this.Name;
            }
            if (string.IsNullOrEmpty(this.UniqueId))
            {
                this.UniqueId = this.Name;
            }
            if (this.Text == null)
            {
                this.Text = this.Name;
            }

            this.Margin = new Padding(0, 0, 0, 0);
            this.Text = "tabControl" + counter.ToString();
            this.Name = EIBControlCollection.CheckControlForUniqueness<EIBTabControl>(this.Name);
            if (string.IsNullOrEmpty(this.ControlName))
            {
                this.ControlName = this.Name;
            }
            EIBControlCollection.TabControllist.Add(this.Name, this.Name);
        }

        protected override void OnSelected(TabControlEventArgs e)
        {
            base.OnSelected(e);
            foreach (Control control in e.TabPage.Controls)
            {
                if (control is EIBButton)
                {
                    bool isVisible = ((EIBButton)control).getVisibility();
                    ((EIBButton)control).Visible = isVisible;
                }
            }
        }

        protected override void OnSelectedIndexChanged(System.EventArgs e)
        {
            //this.TabPages[this.SelectedIndex].Visible = true;
            base.OnSelectedIndexChanged(e);
        }

        public string ControlType
        {
            get
            {
                return "tabcontrol";
            }
        }
        #region WidthType Changing functionality
        private WidthMeasurement _widthType = WidthMeasurement.Auto;
        [
        Category("Data"),
        Description("Set the width of a control to auto."),
        DefaultValue(WidthMeasurement.Auto)
        ]
        public WidthMeasurement WidthType
        {
            get { return this._widthType; }
            set
            {
                if (this._widthType != value)
                {
                    if (this._widthType == WidthMeasurement.Percent && (value == WidthMeasurement.Auto || value == WidthMeasurement.Pixel))
                    {
                        this._widthType = value;
                        this._Width = base.Width;
                    }
                    else if ((this._widthType == WidthMeasurement.Auto || this._widthType == WidthMeasurement.Pixel) && value == WidthMeasurement.Percent)
                    {
                        this._widthType = value;
                        if(this.Parent != null) { int pWidth = this.Parent.Width;
                        int mWidth = (base.Width * 100) / pWidth;
                        this._width = mWidth;
                        }
                    }
                    else
                    {
                        this._widthType = value;
                        this.OnLayout(new LayoutEventArgs(this, "WidthType"));
                    }
                }
                else
                {
                    this._widthType = value;
                }

            }
        }

       
        private HeightMeasurement _heightType = HeightMeasurement.Auto;
        [
        Category("Data"),
        Description("Set the height of a control to auto."),
        DefaultValue(HeightMeasurement.Auto)
        ]
        public HeightMeasurement HeightType
        {
            get { return this._heightType; }
            set
            {
                if (this._heightType != value)
                {
                    if (this._heightType == HeightMeasurement.Percent && (value == HeightMeasurement.Auto || value == HeightMeasurement.Pixel))
                    {
                        this._heightType = value;
                        this._Height = base.Height;
                    }
                    else if ((this._heightType == HeightMeasurement.Auto || this._heightType == HeightMeasurement.Pixel) && value == HeightMeasurement.Percent)
                    {
                        this._heightType = value;
                        if (this.Parent != null)
                        {
                            int pHeight = this.Parent.Height;
                            int mHeight = (base.Height * 100) / pHeight;
                            this._height = mHeight;
                        }
                    }
                    else
                    {
                        this._heightType = value;
                        this.OnLayout(new LayoutEventArgs(this, "HeightType"));
                    }
                }
                else
                {
                    this._heightType = value;
                }

            }
        }


        private int _height;
        [
        DisplayName("Height"),
        Browsable(true),
        Category("Data"),
        Description("Set the height of a control.")
        ]
        public int _Height
        {
            get { return this._height; }
            set
            {
                if (this._height != value)
                {
                    this._height = value;
                    this.OnLayout(new LayoutEventArgs(this, "_height"));
                }
            }
        }
        
        private int _width;
        [
        DisplayName("Width"),
        Browsable(true),
        Category("Data"),
        Description("Set the width of a control.")
        ]
        public int _Width
        {
            get { return this._width; }
            set
            {
                if (this._width != value)
                {
                    this._width = value;
                    this.OnLayout(new LayoutEventArgs(this, "_width"));
                }
            }
        }
        private bool shouldWidthChangeFireSizeChange = true;
        public bool ShouldWidhtChangeFireSizeChange
        {
            get
            {
                return shouldWidthChangeFireSizeChange;
            }
            set
            {
                shouldWidthChangeFireSizeChange = value;
            }
        }

        private bool shouldHeightChangeFireSizeChange = true;
        public bool ShouldHeightChangeFireSizeChange
        {
            get
            {
                return shouldHeightChangeFireSizeChange;
            }
            set
            {
                shouldHeightChangeFireSizeChange = value;
            }
        }


        public void Control_Layout(object sender, LayoutEventArgs e)
        {
            if (e.AffectedProperty == "_width")
            {
                calculateWidth();
            }
            if (e.AffectedProperty == "WidthType")
            {
                calculateWidth();
            }

            if (e.AffectedProperty == "_height")
            {
                calculateHeight();
            }
            if (e.AffectedProperty == "HeightType")
            {
                calculateHeight();
            }


        }
        public void Control_SizeChanged(object sender, System.EventArgs e)
        {
            if (shouldWidthChangeFireSizeChange)
            {
                if (this.WidthType == WidthMeasurement.Percent)
                {
                    if (this.Parent != null)
                    {
                        int pWidth = this.Parent.Width;
                        int mWidth = (base.Width * 100) / pWidth;
                        this._width = mWidth;
                    }
                }
                else if (this.WidthType == WidthMeasurement.Auto || this.WidthType == WidthMeasurement.Pixel)
                {
                    this._width = base.Width;
                }
            }
            if (shouldHeightChangeFireSizeChange )

            {
                if (this.HeightType == HeightMeasurement.Percent)
                {
                     if (this.Parent is EIBTabControl)
                    {
                        if (this.Parent != null)
                        {
                            int pHeight = this.Parent.Height;
                            int mHeight = (base.Height * 100) / pHeight;
                            this._height = mHeight;
                        }
                    }
                }
                else if (this.HeightType == HeightMeasurement.Auto || this.HeightType == HeightMeasurement.Pixel)
                {
                    this._height = base.Height;
                }
            }

        }




        public void calculateWidth()
        {
            if (this.WidthType == WidthMeasurement.Auto || this.WidthType == WidthMeasurement.Pixel)
            {
                base.Width = this._Width;
            }
            else
            {
                if (this.Parent != null)
                {
                    int wdth = this.Parent.Size.Width;
                    base.Width = (wdth * this._Width) / 100;
                }
            }
        }

        public void calculateHeight()
        {
            if (this.HeightType == HeightMeasurement.Auto || this.HeightType == HeightMeasurement.Pixel)
            {
                base.Height = this._Height;
            }
            else
            {
                if (this.Parent != null)
                {
                    int hgth = this.Parent.Size.Height;
                    base.Height = (hgth * this._Height) / 100;
                }
            }
        }

        [Browsable(false)]
        public new Size Size
        {
            get
            {
                return base.Size;
            }
            set
            {
                base.Size = value;
            }
        }

        #endregion

    }
}
